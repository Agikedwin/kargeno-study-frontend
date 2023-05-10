import { accessLevelActions } from './api-slice';

import { CREATE_ACCESS_LEVEL } from '../graphql/mutations/app-mutations';
import { async } from 'validate.js';

//import { useMutation } from '@apollo/client';





export const apiFetchData = async(query, params) =>{




  let savedData = [];
  console.log('Id passed with the query ',params )
  console.log('Id passed with the query ',params )

  try {
    await fetch('http://localhost:3005/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: {paramId: params}
      })
    }).then(r => {
      
      return  r.json()
    })
      .then(levels => {
        savedData = levels;
        console.log('FETCH AT ACTIONS ()',savedData)
        // return (dispatch) => {
        //   dispatch(accessLevelActions.apiFetchData([...savedData]));

        // };
        
      })
      .catch(error => {
        throw Error(error)
      });

  } catch (error) {
    throw Error(error)
  }

  return savedData;

  /* return async (dispach) =>{
    await dispach(accessLevelActions.apiFetchData(payload));
  } */

}



export const apiSaveData = async (payload, mutation) => {

  console.log('payload ====== ',payload);
  console.log('mutation ====== ',mutation);

 

  let savedData = [];

  try {
    await fetch('http://localhost:3005/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        // 2 dimensions array with all the elements at index 0, then loop the rest using i
        variables:payload,

      })
    }).then(r => {
      
      return  r.json()
    })
      .then(data => {
        savedData = data;
        // return (dispatch) => {
        //   dispatch(accessLevelActions.apiFetchData([...savedData]));

        // };
        
      })
      .catch(error => {
        throw Error(error)
      });

  } catch (error) {
    throw Error(error)
  }

  return savedData;
  
 
}


export const getSelectedUser =  (data) => {
  return async (dispach) =>{
    await dispach(accessLevelActions.apiFetchSelectedUser(data));
  }

}

export const getSelectedUserVisits =  (data) => {
  return async (dispach) =>{
    await dispach(accessLevelActions.apiFetchSelectedVisits(data));
  }

}



export const showMessages =  (data) => {
  return async (dispach) =>{
    await dispach(accessLevelActions.apiFetchData(data));
  }

}
 