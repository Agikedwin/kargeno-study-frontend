import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const CustomerManagementList = () => {
  const classes = useStyles();

  const [customers, setCustomers] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios.get('/api/management/customers').then(response => {
        if (mounted) {
          setCustomers(response.data.customers);
        }
      });
    };
    

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let mounted = true;

    const fetchdata = () => {
      // eslint-disable-next-line no-console
      console.log('Fetching data');
      fetch('https://dummyjson.com/products/')
        .then(res => res.json())
        // eslint-disable-next-line no-console
        .then(json => console.log(json))
    };
    

    fetchdata();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      {customers && (
        <Results
          className={classes.results}
          customers={customers}
        />
      )}
    </Page>
  );
};

export default CustomerManagementList;
