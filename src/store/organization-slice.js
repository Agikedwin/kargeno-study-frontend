import { createSlice  } from '@reduxjs/toolkit';
//import { initialState } from 'react-doc-viewer/build/state/reducer';

const organizationSlice = createSlice({
  name: 'org',
  initialState: {
    initOrganization:{
      /*  name: '',
      email: '',
      address: {
        postalCode: '',
        town: '',
        postalAddress: ''
      },
      phone: {
        countryCode: '',
        phoneNumber: '',
      }, */
    }
  },
  intMessages :{
    message:'No data available'

  },

  initialState1:{
    showMessages: false
  },


  reducers: {

    createOrganization(state,action) {
      state.initOrganization = action.payload;
      
    },
    
    /* createOrganization(state= initialState, action) {
      return {
        ...state.initialState = action.payloads
      }
      
    }, */
    showMessages(state, action) {
      state.intMessages = action.payload
    }
    

  }


})
export const organizationActions  = organizationSlice.actions;
export default organizationSlice;