import gql from "graphql-tag";

//  login mutation
export const LOGIN = gql`
  mutation login($username: String!, $password: String!, $otp: Int!) {
    login(username: $username, password: $password, otp: $otp) {
      token
      refreshToken
      payload
      refreshExpiresIn
    }
  }
`;

export const OTP = gql`
  mutation sendOtp($username: String!, $password: String!) {
    sendOtp(username: $username, password: $password) {
      message
      isDefaultPassword
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($defaultPassword: String!, $newPassword: String!) {
    resetPassword(
      defaultPassword: $defaultPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation revokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;

// Add Member to group
export const ASSIGN_ROLE = gql`
  mutation addUserGroup($group: Int!, $user: Int!) {
    addUserGroup(user: $user, group: $group) {
      userGroup {
        group
        user
      }
    }
  }
`;


