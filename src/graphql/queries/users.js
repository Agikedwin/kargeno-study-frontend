import gql from 'graphql-tag';




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