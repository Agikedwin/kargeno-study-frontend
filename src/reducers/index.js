import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import organizationSlice  from '../store/organization-slice';
import accessLevelSlice from '../store/api-slice';

const rootReducer = combineReducers({
  session: sessionReducer,
  org: organizationSlice.reducer,
  accessLevel: accessLevelSlice.reducer
});

export default rootReducer;organizationSlice

