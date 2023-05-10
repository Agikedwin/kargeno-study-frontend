import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import moment from 'moment';
import { useDispatch, useSelector  } from 'react-redux';


import { Label } from 'components';
import { CustomerEdit, EnrollInProgram } from './components';
import  {getSelectedUser } from 'store/api-actions';
import { async } from 'validate.js';
import { FETCH_PROGRAM } from '../../../../../../graphql/queries/app-queries'
import { CREATE_USER_PROGRAMS } from '../../../../../../graphql/mutations/app-mutations'
import  {apiFetchData , apiSaveData} from 'store/api-actions';



const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerInfo = props => {
  const { user, className, ...rest } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

 

  const [openEdit, setOpenEdit] = useState(false);

  const [openEnrol, setOpenEnroll] = useState(false);
  const [programs, setPrograms] = useState(false);
  
  const setStoreData = async (data) =>{
    return await dispatch(getSelectedUser(data));
  }

  const fetchPrograms = async () => {
    await apiFetchData(FETCH_PROGRAM).then(res =>{  
      console.log('Get FETCH_PROGRAM', res.data.getPrograams)
      setPrograms(res.data.getPrograams) 
     
    })
  }

  const saveEnrollment = async (data) => {
    await apiSaveData(data, CREATE_USER_PROGRAMS).then(res =>{  
      console.log('Get FETCH_PpostUser PogramOGRAM', res.data)
      setPrograms(res.data.postUserPogram);
     
    })
  }



  useEffect( () =>{
    if(user){
      console.log('THE USER ID IS ***********************8 ' ,user)
      setStoreData(user);
      fetchPrograms();
    }    
  },[user,dispatch])




  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEnroll = () => {
    setOpenEnroll(true);
  };

  const handleEnrollClose = () => {
    console.log("Enrolling ------ ");
    setOpenEnroll(false);
  };
  const handleSaveEnrollment = (data) =>{
    saveEnrollment(data);
    setOpenEnroll(false);

  }
  return (
    
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="User Details " />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                {user.status}
                <div>
                  <Label
                    color={
                      user.status ? colors.green[600] : colors.orange[600]
                    }
                  >
                    {user.status
                      ? 'Enrolled'
                      : 'Not Yet Enrolled'}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Name</TableCell>
              <TableCell>{user.surname } {user.other_names}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{user.gender }</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Designation</TableCell>
              <TableCell>{user.surname }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>{user.surname}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Date Registered</TableCell>
              {/* <TableCell>{moment(user[0].date_created).format('DD/MM/YYYY | HH:MM')}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>
                <Button onClick={handleEditOpen}>
                  <EditIcon className={classes.buttonIcon} />
                  Edit Client
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={handleEnroll}>
                  <EditIcon className={classes.buttonIcon} />
                  Enroll
                </Button>
              </TableCell>
            </TableRow>            
          </TableBody>
        </Table> 
    
      </CardActions>
      
      <CustomerEdit
        user={user}
        onClose={handleEditClose}
        open={openEdit}
      />

      <EnrollInProgram
        user={user}
        programs = {programs}
        onClose={handleEnrollClose}
        save={handleSaveEnrollment}
        open={openEnrol}
      /> 
    </Card>
  );
};

CustomerInfo.propTypes = {
  className: PropTypes.string,
  programs: PropTypes.object.isRequired, 
  user: PropTypes.object.isRequired
};

export default CustomerInfo;
