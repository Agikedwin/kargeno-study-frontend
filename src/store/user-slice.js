import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username:'s', 
    email:'d', 
    password:'g', 
    confirmPassword:'r' 
  },
  reducers: {
    createUsers(initialState,action){
      // eslint-disable-next-line no-console
      console.log(initialState,'THE ACTIONS AT REDUX ',action);
      initialState.name = action.payload.name;
      initialState.email = action.payload.email;
      initialState.password = action.payload.password;
      initialState.confirmPassword = action.confirmPassword;
    },
    fetchUsers(state,action){
      state.data = action.payload
    },
    updateUsers(state,action){
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.confirmPassword;
    }
  },
})

export const userActions = userSlice.actions;
export default userSlice;