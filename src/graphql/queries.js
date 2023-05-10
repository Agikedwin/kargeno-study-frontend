import gql from 'graphql-tag';

// Query Permissions
export const PERMISSIONS = gql`
  query group($id: Int!) {
    group(id: $id) {
      name
      permissions {
        name
        codename
      }
    }
  }
`;


// Get all groups
export const GROUPS = gql`
  query {
    groups {
      id
      name
    }
  }
`;

