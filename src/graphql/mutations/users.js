import gql from 'graphql-tag';


export const CREATE_USER = `
mutation  createUser($surname: String!, $other_names: String, $patient_identifier:String!, $phone_number: String, $designation_id: Int!, $dob: String, $email: String,
  $gender: String) {
  createUser (data: {
    surname: $surname
    other_names: $other_names
    phone_number: $phone_number
    designation_id: $designation_id
    patient_identifier: $patient_identifier
    dob: $dob
    email: $email
    gender: $gender
  }){
    surname
    designation_id
    patient_identifier
    
  }
}
`
export const FETCH_USERS =`
getUsers {
  designation_name
  description
  date_created
  date_updated
  level_id
  designation_id
  _id
  user {
    surname
    other_names
    patient_identifier
    designation_id    
    designation_id
    dob
    email
    phone_number
    gender
    status     

  }
  level {
    date_created
    date_updated
    description
    level_name
    level_id

  }
}
`

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

export const  REGISTER_USER2 = gql`

mutation register( $username: String!,  $email:String!,  $password:String!,  $confirmPassword:String!){
  register(registerInput: 
  {username: $username, email: $email, password: $password, confirmPassword: $confirmPassword})
  {
    username email id, token
  }
}

`
