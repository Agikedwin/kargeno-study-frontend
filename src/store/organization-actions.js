import { useMutation, useQuery, gql } from '@apollo/client';

import {organizationActions} from './organization-slice'
import {CREATE_ORGANIZATION}  from '../graphql/mutations/organization';

export const CREATE_ORGANIZATION1 = gql`
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

export const FETCH_TOPIC_QUERY =gql`
 {
  getTopics {
    username
    id
    topic
    description    
    
  }
}

`
const FETCH_POST_QUERY = gql`
query GetPost($postId: ID!){
    getPost(postId: $postId){
        id 
        body 
        createdAt
        username
        likeCount
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            createdAt
            body
        }
    }
}
`

export const fetchOrganizations = (res) =>{
  const { data, loading, error } = useQuery(FETCH_POST_QUERY);
  //const { data, loading, error } = useMutation(res);

  //console.log(res, '   Fetching organizations*****()()()',error);

  try {
    console.log(data)
  } catch (error) {
    console.log('at the error area ',error)
  }


  return {
    data1: data,
    loading1: 'organ',
    error1: true
  }
}
//const [saveOrganization, { data, loading, error }] = useMutation(CREATE_ORGANIZATION);


export const saveOrganizations = (payload) => {


  console.log('SOME DATA BEING SAVED AT ORG SLICE  ',payload);
  return  async (dispatch) => {
    
    
    const sendRequest = async () => {
      
      //dispatch(organizationActions.createOrganization(data))
    //  saveOrganization(payload);

    };
    
    try {
      await sendRequest();
      
      dispatch(organizationActions.createOrganization(payload))
      dispatch(organizationActions.showMessages('DATA IS SUCCESSFUL'));
    } catch (error) {
      dispatch(organizationActions.createOrganization(error))
      dispatch(organizationActions.showMessages('DATA IS NOT SUCCESSFUL'));
     
    }
  };

}


