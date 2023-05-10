import { userActions } from './user-slice';




export const saveUsers = (data) =>{
  // eslint-disable-next-line no-console
  console.log(data);

  return  data
}

export const fetchUsers = (data) =>{



  return (dispach) =>{
    console.log(' the data at user actions is loaded::  >>>>>>>>>> ',data1)
    dispach(userActions.fetchUsers(data));
  }

}