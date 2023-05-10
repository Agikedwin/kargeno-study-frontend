import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

//import { useDispatch, useSelector  } from 'react-redux';
//import { organizationActions } from 'store/organization-slice';
//import { useQuery } from '@apollo/client';



//import { CREATE_ORGANIZATION } from '../../../../graphql/mutations/organization';

//import { FETCH_ACCES_LEVELS_QUERY } from '../../../../graphql/queries/access-level-query';

//import  {fetchOrganizations} from 'store/organization-actions';
import  {apiFetchData} from 'store/api-actions';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors
} from '@material-ui/core';

import SuccessSnackbar from '../SuccessSnackbar';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const RegisterOrganization = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [organization, setOrganization] = useState({
    name: '',
    email: '',
    address: {
      postalCode: '',
      town: '',
      postalAddress: ''
    },
    phone: {
      countryCode: '',
      phoneNumber: '',
    },
  });
  //const  dispatch = useDispatch();


  //const { data, loading, error } =  useQuery(FETCH_ACCES_LEVELS_QUERY);
  //const [saveOrganization, { data, loading, error }] = useMutation(CREATE_ORGANIZATION);
 // console.log('loading : ', loading);

  
 

  //const accessLevel = useSelector((state) =>state.accessLevel.data);
  //  const { user } = useSelector((state) => ({ ...state.auth }));

  //console.log(' State data : ', accessLevel);


  const handleChange = event => {   

    setOrganization({
      ...organization,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeAddress = event => {   

    setOrganization({
      ...organization,
      address: {
        ...organization.address,
        [event.target.name]: event.target.value

      }
      
    });
  };

  const handleChangePhone = event => {   

    setOrganization({
      ...organization,
      phone: {
        ...organization.phone,
        [event.target.name]: event.target.value

      }
      
    });
  };




  const handleSubmit = event => {
    event.preventDefault();
    setOpenSnackbar(true);
    console.log('LOG ORG DATA AT SUBMIT:: ',organization)
    dispatch(organizationActions.createOrganization(organization));
    //dispatch(saveOrganizations(organization))
  
    //saveOrganization({ variables: organization });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="Add new organization" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Organization  name"
                name="name"
                onChange={handleChange}
                value={organization.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization Email"
                name="email"
                onChange={handleChange}
                value={organization.email}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Postal Address"
                name="postalAddress"
                onChange={handleChangeAddress}
                value={organization.address.postalAddress}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Town Address"
                name="town"
                onChange={handleChangeAddress}
                value={organization.address.town}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                onChange={handleChangeAddress}
                type="text"
                value={organization.phone.postalCode}
                variant="outlined"
              />
            </Grid>
       
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country Code"
                name="countryCode"
                onChange={handleChangePhone}
                value={organization.phone.countryCode}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChangePhone}
                value={organization.phone.phoneNumber}
                variant="outlined"
              />
            </Grid>

            
           
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.saveButton}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
};

RegisterOrganization.propTypes = {
  className: PropTypes.string,
  //organization: PropTypes.object.isRequired
};


export default RegisterOrganization

