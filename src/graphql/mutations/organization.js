import gql from 'graphql-tag';

export const CREATE_ORGANIZATION = gql`
mutation createOrganization($name: String!, $email: String, $address: [address],
      $phone: [phone]){
        organizationRequest(name:$name,email:$email, address:$address,  
            phone: $phone        
          ){ 
          name
          email
     }
     }

`

