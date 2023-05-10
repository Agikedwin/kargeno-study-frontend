import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';



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
  colors
} from '@material-ui/core';
import { boolean } from 'yup/lib/locale';

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
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const EnrollInProgram = props => {
  const { open, onClose, user, programs,save, className, ...rest } = props;
  const [calendarTrigger, setCalendarTrigger] = useState(null);


  const classes = useStyles();

  const [formState, setFormState] = useState({
    userId: '',
    enrollStatus: false,
    programId: '',
    enrollment_date: '',
  });

  if (!open) {
    return null;
  }

  const handleCalendarOpen = trigger => {
    setCalendarTrigger(trigger);
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = date => {    
    formState.enrollment_date = date._d
    console.log('Calendar::: ',formState)
    
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  const calendarOpen = Boolean(calendarTrigger);



  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };



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
              Enroll Client
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
                  disabled
                  fullWidth
                  label="Surname"
                  name="email"
                  onChange={handleFieldChange}
                  value={user.surname} 
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
                  options={programs}
                  getOptionLabel={programs => programs.programName}
                  renderInput={(params) => <TextField {...params} label="Select Program"   variant="outlined"/>}
                  onChange={(event, newValue) => {
             
                    formState.programId = newValue.id;
                    formState.userId = user._id
                    
                    console.log('At auto programs',formState);


                  // setTypeOptions(newValue);
                  }}
              
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
                  label="Enrollment Date"
                  name="enrollment_date"
                  onClick={() => handleCalendarOpen('startDate')}
                  value={moment(formState.enrollment_date).format('DD/MM/YYYY')}
                  variant="outlined"
                />
              </Grid>
             
              <Grid
                item
                md={6}
                xs={12}
              >
                <Typography variant="h5">Consent</Typography>
                <Typography variant="body2">
                  The client consented to draw blood samples
                </Typography>
                <Switch
                  checked={formState.enrollStatus}
                  color="secondary"
                  edge="start"
                  name="enrollStatus"
                  onChange={handleFieldChange}
                  value={formState.enrollStatus}
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
              onClick={() => {
                save(formState)
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

EnrollInProgram.displayName = 'Enroll In Program';

EnrollInProgram.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

EnrollInProgram.defaultProps = {
  open: false,
  onClose: () => {}
};

export default EnrollInProgram;
