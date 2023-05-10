import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  colors,
  
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import { alpha, color } from '@material-ui/core/styles';
import {  useSelector  } from 'react-redux';





const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  saveButton: {
    alpha: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const AddServices = props => {
  const classes = useStyles();
  const { open, onClose,saveService, visit, visitServices,lastVisit,className, ...rest } = props;




  const [calendarTrigger, setCalendarTrigger] = useState(null);
  const calendarOpen = Boolean(calendarTrigger);
  const [calendaControl, setCalendaControl] = useState('');

  const selectedUser  = useSelector((state) => ({ ...state.accessLevel.selectedUser }));



  const [formState, setFormState] = useState({
 
    userId: '',
    visitId: '',
    visitType: '',
    visitDate: '',
    serviceOfferedId: '',
    physicalVisitId:'',
    visitNumber: '',
    
  });

  const visitTypesList = [{
    typeId: 1,
    typeName: 'Physical Visit',
    active: true,
  },
  

  ]

  const [typeVistOptions, setTypeOptions] = useState(visitTypesList);
  let dateLablel = ''


  useEffect(() =>{
    if(lastVisit.length > 0){
      visitTypesList.splice(0,1)
      dateLablel = visitTypesList[0].typeName
    }else{
      visitTypesList.splice(1,1)
      dateLablel = visitTypesList[0].typeName

    }
    
    
  },[lastVisit])

  const handleCalendarOpen = (trigger,contromName) => {
    
    setCalendaControl(contromName)
    setCalendarTrigger(trigger);
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = date => {  

    if(calendaControl ==='visitDate'){
      formState.visitDate = date._d
    }else{
      formState.nextVisitdate = date._d
    }

    
  };

  const handleCalendarAcceptNext = date => {    
    formState.nextVisitdate = date._d
    
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

 
  if (!open) {
    return null;
  }

  const handleFieldChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };




  return (
    
    <Modal
      onClose={onClose}
      open={open}
    >
    
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
            >
             Client Visits
            </Typography>
            <Grid
              className={classes.container}
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  disabled
                  label="Visit Number"
                  name="visitNumber"
                  onChange={handleFieldChange}
                  value={visit.visitNumber}
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
                  disabled
                  label={dateLablel}
                  name="visitName"
                  onChange={handleFieldChange}
                  value={visit.visitName}
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
                  label="Visit Date"
                  name="visitDate"
                  onClick={() => handleCalendarOpen('visitDate','visitDate')}
                  value={moment(formState.visitDate).format('DD/MM/YYYY')}
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
                  options={visitTypesList}
                  getOptionLabel={typeVistOptions => typeVistOptions.typeName}
                  renderInput={(params) => <TextField {...params} label={dateLablel}   variant="outlined"/>}
                  onChange={(event, newValue) => {
                    formState.visitType = newValue.typeId
                    console.log('At auto',visit);


                  }}
              
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
                  options={visitServices}
                  getOptionLabel={visitServices => visitServices.serviceName}
                  renderInput={(params) => <TextField {...params} label="Service Being Offered"   variant="outlined"/>}
                  onChange={(event, newValue) => {
                    formState.serviceOfferedId = newValue.id
                    console.log('Service Being Offered ',newValue.id);


                    setTypeOptions(newValue);
                  }}
              
                />
              </Grid>

              
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              onClick={onClose}
              variant="contained"
            >
              Close
            </Button>
            <Button
              className={classes.saveButton}
              onClick={() =>{
                formState.visitId = visit._id
                formState.userId = selectedUser._id,
                formState.physicalVisitId = visit.physicalVisits[0]._id
                formState.visitNumber = visit.visitNumber
                saveService(formState)

                
                
              }}
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </form> 

        <DatePicker
          onAccept={handleCalendarAccept}
          onChange={handleCalendarChange}
          onClose={handleCalendarClose}
          open={calendarOpen}
          style={{ display: 'none' }} // Temporal fix to hide the input element
        
          variant="dialog"
        />
      </Card>
    </Modal>
  );
};

AddServices.displayName = 'Add Services';

AddServices.propTypes = {
  className: PropTypes.string,
  //customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

AddServices.defaultProps = {
  open: false,
  onClose: () => {}
};

export default AddServices;
