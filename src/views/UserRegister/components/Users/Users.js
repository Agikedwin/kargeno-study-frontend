import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';



import {  FETCH_DESIGNATIONS } from '../../../../graphql/queries/app-queries';

import  {apiFetchData, apiSaveData } from 'store/api-actions';
import SuccessSnackbar from '../SuccessSnackbar';
import { CREATE_USER } from 'graphql/mutations/app-mutations';


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

const Users = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [calendaValue, setValue] = useState('');
  const [accessLevel, setAccessLevel] = useState();

  const initialValues = {
    name: '',
    tag: '',
    tags: ['Full-Time', 'ReactJS'],
    startDate:'',
    endDate: ''
  };

  const [values, setValues] = useState({ ...initialValues });
  const [calendarTrigger, setCalendarTrigger] = useState(null);
  

  const [userDetails, setUserDetails] = useState({
    surname: '',
    other_names: '',
    email: '',
    phone: '',
    gender:'',
    phone_number: '',
    dob: '',
    patient_identifier: '',
    level_id:'',
    designation_id:'',
  });




  const fetchDesignations = async () => {
    await apiFetchData(FETCH_DESIGNATIONS).then(res =>{  
      console.log('Designations fetched ',res.data.getAllDesignations)
      setDesignations(res.data.getAllDesignations) 
     
    })
  }
  
  const saveUser = async(userData) => {
    await apiSaveData(userData, CREATE_USER).then(res =>{
      console.log('Save user  data ',res)
    // setAccessLevel([...designations, res.data.createDesignations]);
    });
  };
  useEffect(() =>{
    fetchDesignations();
  },[])


  /*  const saveResData = async(event) => {
    await apiSaveData(event,CREATE_DESIGNATIONS).then(res =>{
      setAccessLevel([...designations, res.data.createDesignations]);
    });
  };
 */
  const handleSubmit = event => {
    event.preventDefault();
    setOpenSnackbar(true);

    //addUsers({ variables: userValues });
  };




  const handleChange = event => {
    event.persist();

    setUserDetails({
      ...userDetails,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };
  //const userValues = { username:'agik11', email:'agikedwin@gmail11.com', password:'agik11', confirmPassword:'agik11' };



  const handleCalendarOpen = trigger => {
    setCalendarTrigger(trigger);
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = date => {    
    userDetails.dob = date._d
    console.log('Calendar::: ',userDetails)
    
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  const calendarOpen = Boolean(calendarTrigger);


  const genderTypes = ['Male', 'Female'];

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const saveUserDetails = () => {
    userDetails.gender = selectedGender;
    userDetails.designation_id = selectedDesignation.designation_id;
    userDetails.level_id = selectedDesignation.level_id;
    console.log(userDetails);

    saveUser(userDetails);
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="user" />
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
                label="First name"
                name="surname"
                onChange={handleChange}
                required
                value={userDetails.surname}
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
                label="Other names"
                name="other_names"
                onChange={handleChange}
                required
                value={userDetails.other_names}
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
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={userDetails.email}
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
                name="phone_number"
                onChange={handleChange}
                type="text"
                value={userDetails.phone_number}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Autocomplete
                className={classes.field}
                fullWidth
                id="combo-box-demo"
                options={designations}
                getOptionLabel={options => options.designation_name}
                renderInput={(params) => <TextField {...params} label="Designation"   variant="outlined"/>}
                onChange={(event, newValue) => {
                  console.log(newValue);

                  setSelectedDesignation(newValue);
                  setAccessLevel(newValue.userlevels[0].level_name);
                }}
            
              />

            </Grid>

            {/*  <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                name="level"
                onChange={handleChange}
                type="text"
                value={accessLevel}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={12}
              xs={12}
            >
              <Autocomplete
                className={classes.field}
                fullWidth
                id="combo-box-demo"
                options={genderTypes}
                getOptionLabel={genderTypes => genderTypes}
                renderInput={(params) => <TextField {...params} label="Gender"   variant="outlined"/>}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setSelectedGender(newValue);
                }}
                
            
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="PID"
                name="patient_identifier"
                onChange={handleChange}
                type="text"
                value={userDetails.patient_identifier}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                className={classes.dateField}
                fullWidth
                label="DOB"
                name="userDetails.dob "
                onClick={() => handleCalendarOpen('startDate')}
                value={moment(userDetails.dob).format('DD/MM/YYYY')}
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
            onClick={saveUserDetails}
          >
            Save Changes
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />

      <DatePicker
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }} // Temporal fix to hide the input element
       
        variant="dialog"
      />
    </Card>
  );
};

Users.propTypes = {
  className: PropTypes.string,
  //user: PropTypes.object.isRequired
};


export default Users


