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

const AddUserVisitServices = forwardRef((props, ref) => {
  const {
    visits,
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
    serviceName: '',
    visitId: '',
    duration: '',
    description: '',
   
  };


  //const options = accessLevel;

  const [values, setValues] = useState(event || defaultLevels);


  const [selectedOptions, setSelectedOptions] = useState([]);

  const defaultValue = '';

  const [value, setValue] = useState(defaultLevels);



  const handleChange = event => {
    event.persist();

    setOption(event.target.value);
  };

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
    if (!values.serviceName || !values.description ) {
      return;
    }


    values.visitId = value.id


    

    onAdd({ ...values });
  };

  const handleEdit = () => {
    if (!values.designation_name || !values.description) {
      return;
    }

    onEdit(...values);
  };

  //const selectedAutoItem = (event, value) =>setSelectedOptions(value);



  
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
            label="Service  Name"
            name="serviceName"
            onChange={handleFieldChange}
            value={values.serviceName}
            variant="outlined"
          />
          
          <Autocomplete
            className={classes.field}
            fullWidth
            id="combo-box-demo"
            options={visits}
            getOptionLabel={options => options.visitName}
            renderInput={(params) => <TextField {...params} label="Visit Name"   variant="outlined"/>}
            onChange={(event, newValue) => {
              console.log(newValue);
              setValue(newValue);
            }}
            
            
          />
          <TextField
            className={classes.field}
            fullWidth
            type='number'
            label="Service Duration"
            name="duration"
            onChange={handleFieldChange}
            value={values.duration}
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

AddUserVisitServices.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddUserVisitServices;
