import { createSlice } from '@reduxjs/toolkit';

const accessLevelSlice = createSlice({
  name: 'accessLevel',
  initialState: {
    initValus: {
      level_name: '',
      description: '', 
    }, 

    data: [],
    message: {},
    selectedUser:[],
    selectedUserVisits:[],
    
  },
 
  reducers: {
    createAccessLevel(initialState,action){
      // eslint-disable-next-line no-console
      console.log(initialState, 'And actions', action);
      initialState.level_name = action.payload.level_name;
      initialState.description = action.payload.description;
    },
    apiFetchData(state,action){
      
      state.data = action.payload;
    },
    apiFetchSelectedUser(state,action){
      
      state.selectedUser = action.payload;     
    },
    apiFetchSelectedVisits(state,action){
      
      state.selectedUserVisits = action.payload;     
    },
    updateAccessLevel(state,action){
      
      state.level_name = action.payload.level_name;
      state.description = action.payload.description;
    },
    message(state,action){
      state.message = action.payload
    }
  },
})
  
export const accessLevelActions = accessLevelSlice.actions;
export default accessLevelSlice;