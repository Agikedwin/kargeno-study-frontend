/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  colors,
  
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Autocomplete from '@mui/material/Autocomplete';


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
  field: {
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const AddVisits = forwardRef((props, ref) => {
  const {
    programs,
    event,
    onDelete,
    onCancel,
    onAdd,
    onEdit,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  const defaultLevels = {
    visitName: '',
    program_id: '',
    windowPeriod: '',
    visitNumber: '',
    dayFromBaseDate: '',
    description: '',


   
  };


  //const options = accessLevel;

  const [values, setValues] = useState(event || defaultLevels);



  const [value, setValue] = useState(defaultLevels);




  const mode = event ? 'edit' : 'add';

  const handleFieldChange = e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleDelete = () => {
    onDelete && onDelete(event);
  };

  const handleAdd = () => {
    if (!values.visitName || !values.visitNumber ) {
      return;
    }
  
    values.program_id = value.id;

    onAdd({ ...values });
  };

  const handleEdit = () => {
    if (!values.designation_name || !values.description) {
      return;
    }

    onEdit(...Cardvalues);
  };

  const visitTypes = [{
    typeId: 1,
    typeName: 'Physical Visit',
    active: true,
  },
  {
    typeId: 2,
    typeName: 'Phone Call Visit',
    active: true,

  }

  ]

  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={ref}
    >
      <form>
        <CardContent>
          <Typography
            align="center"
            gutterBottom
            variant="h3"
          >
            {mode === 'add' ? 'Add Event' : 'Edit Event'}
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Visit Name"
            name="visitName"
            onChange={handleFieldChange}
            value={values.visitName}
            variant="outlined"
          />
          
          <Autocomplete
            className={classes.field}
            fullWidth
            id="combo-box-demo"
            options={programs}
            getOptionLabel={options => options.programName}
            renderInput={(params) => <TextField {...params} label="Project/Study"   variant="outlined"/>}
            onChange={(event, newValue) => {
              console.log(newValue);
              setValue(newValue);
            }}
            
            
          /> 
          <TextField
            className={classes.field}
            fullWidth
            type="number"
            label="visit Number"
            name="visitNumber"
            onChange={handleFieldChange}
            value={values.visitNumber}
            variant="outlined"
          />

          <TextField
            className={classes.field}
            fullWidth
            type="number"
            label="window Period"
            name="windowPeriod"
            onChange={handleFieldChange}
            value={values.windowPeriod}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            type="number"
            label="Number From Base Date"
            name="dayFromBaseDate"
            onChange={handleFieldChange}
            value={values.dayFromBaseDate}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            label="Description"
            name="description"
            onChange={handleFieldChange}
            value={values.description}
            variant="outlined"
          />
          
          
         
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton
            edge="start"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            className={classes.cancelButton}
            onClick={onCancel}
            variant="contained"
          >
            Cancel
          </Button>
          {mode === 'add' ? (
            <Button
              className={classes.confirmButton}
              onClick={handleAdd}
              variant="contained"
            >
              Add
            </Button>
          ) : (
            <Button
              className={classes.confirmButton}
              onClick={handleEdit}
              variant="contained"
            >
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
});

AddVisits.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddVisits;
