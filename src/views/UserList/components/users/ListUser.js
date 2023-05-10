import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';



import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { ReviewStars, GenericMoreButton, TableEditBar } from 'components';
import { FETCH_USERS } from '../../../../graphql/queries/app-queries'
import  {apiFetchData } from 'store/api-actions';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const ListUser = props => {

  
  const { className,  ...rest } = props;

  const classes = useStyles();

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadUsers, setUsers] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);

  let loadUserData = [];



  const fetchUsers = async() =>{
    await apiFetchData(FETCH_USERS,'').then(user =>{
      if(user.data.getUsers.length > 0){
        console.log('FETCH_USERS  second uppp  ',user.data.getUsers)
        setUsers(user.data.getUsers);
        setLoadStatus(true)
      }
      

    });//

  }

  useEffect(() =>{
    fetchUsers();
   
  },[])



  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {loadUsers.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(loadUsers.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="All Users"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                  
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Reviews</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadUsers && loadUsers.map(user => (
                    <TableRow
                      hover
                      key={user._id}
                    >
                      
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src='/images/avatars/avatar_5.png'
                          >
                            {getInitials(user.surname)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to="/management/customers/1"
                              variant="h6"
                            >
                              {user.surname}
                            </Link>
                            <div>{user.other_names}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.designation[0].designation_name}</TableCell>
                      <TableCell>
                        {user.level[0].level_name}
                      </TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.phone_number}</TableCell>
                      <TableCell>
                        <ReviewStars value={user.status + 1} />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Visits">
                          <IconButton
                            color="primary"
                            component={RouterLink}
                            size="small"
                            to= {`/user/details/${user._id}/summary`}
                            variant="outlined"
                           
                            edge="end"
                            size="small"
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        </Tooltip>
                     
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={loadUsers.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedCustomers} />
    </div>
  );
};

ListUser.propTypes = {
  className: PropTypes.string,
};

ListUser.defaultProps = {
  // users: users
};

export default ListUser