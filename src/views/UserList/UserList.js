import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Page, SearchBar } from 'components';
import axios from 'utils/axios';

import { FETCH_USERS } from '../../graphql/queries/app-queries'
import  {apiFetchData } from 'store/api-actions';





import { Header,ListUser } from './components'
import { async } from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));


function ListItems() {

  


  const classes = useStyles();
  const handleFilter = () => {};
  const handleSearch = () => {};





  return (
    <Page
      className={classes.root}
      title="List of all Users"
    >
      {/*  <Header /> */}
      
      <SearchBar
        onSearch={handleSearch}
      />
      <ListUser
        className={classes.results}
         
      />
      
      
    </Page>
  )
    
 


}

export default ListItems