import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { CustomerInfo, Invoices, SendEmails, OtherActions } from './components';
import {useParams } from 'react-router-dom';

import { FETCH_USERS } from '../../../../graphql/queries/app-queries'
import  {apiFetchData } from 'store/api-actions';



const useStyles = makeStyles(() => ({
  root: {}
}));

const Summary = props => {
  const { className, ...rest } = props;
  const [user, setUsers] = useState([]);


  const classes = useStyles();
  const [customer, setCustomer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [todos, setTodos] = useState([]);
  let { id } = useParams();


  let userDataFetched = [];



  const fetchUsers = async(selectedUserId) =>{
  
    await apiFetchData(FETCH_USERS,selectedUserId).then(res =>{

     
      if(res.data.getUsers.length > 0){
        userDataFetched = res.data.getUsers;
        setUsers(res.data.getUsers[0]);
        setIsLoading(false);
      }
    });//

  }




  useEffect(() => {

    
    fetchUsers(id);  
   
   
  },[]);

  useCallback(() => {

    if(!isLoading){
      setUsers(userDataFetched);



    }

  },[isLoading]);

 
  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        {user.level ? ( <CustomerInfo user={user} /> ) :<p>No data</p>}
        
      </Grid>
      {/*       <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <Invoices customer={customer} />
        </Grid> */}
      <Grid
        item
        lg={8}
        md={8}
        xl={8}
        xs={12}
      >
        <SendEmails customer={customer} />
      </Grid> 
      {/*       <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <OtherActions />
        </Grid> */}
    </Grid>
  );
  
};

Summary.propTypes = {
  className: PropTypes.string
};

export default Summary;
