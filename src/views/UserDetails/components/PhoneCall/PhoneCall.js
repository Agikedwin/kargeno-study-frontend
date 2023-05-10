import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';


import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';

import { Label, GenericMoreButton } from 'components';
import AddCallVisit from './components/AddCallVisit';
import { FETCH_VISITS_SERVICES } from '../../../../graphql/queries/app-queries';
import { CREATE_CALL_SERVICES_OFFERED } from '../../../../graphql/mutations/app-mutations';

import  {apiFetchData , apiSaveData} from 'store/api-actions';



const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  },
  addIcon: {
    marginRight: theme.spacing(1)
  },
}));

const PhoneCall = props => {
  const { className, ...rest } = props;

  const classes = useStyles();



  const selectedUserVisits  = useSelector((state) => ({ ...state.accessLevel.selectedUserVisits }));
  const [selectedCall, setSelectedCall]  = useState([])
  const [visitServices, setVisitServices] = useState([]);





  const [openCall, setOpenCall] = useState(false);

  const fetchVisitServices = async () => {
    await apiFetchData(FETCH_VISITS_SERVICES).then(res =>{  
      setVisitServices(res.data.getVisitServices) 
     
    })
  }

  const saveServicesOffred = async(payload) => {
    await  apiSaveData(payload,CREATE_CALL_SERVICES_OFFERED).then(res => {
    })

  }

  const handleCallOpen = (event, data) => {
    setSelectedCall(data)

    setOpenCall(true);
  };

  const handleCallsClose = () => {
    setOpenCall(false);
  };
  const handleChange = event => {
    event.persist();

    setOption(event.target.value);
  };
  
  const saveService = (data) =>{
   
    saveServicesOffred(data);
  }

  


  useEffect(()=> {
    //onsole.log('The selected user visits 33 ', currentDate);
  // const visitName = 
    fetchVisitServices();
    

  },[])

  const statusColors = {
    0: colors.orange[600],
    honoured: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Customer invoices"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Visit Name</TableCell>
                    <TableCell>Call Date</TableCell>
                    <TableCell>Days to call</TableCell>
                    <TableCell>Call Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedUserVisits.phoneCalls ? selectedUserVisits.phoneCalls.map(visitCalls => (
                    <TableRow key={visitCalls.id}>
                      <TableCell>
                        {selectedUserVisits.visitName} | Call
                      </TableCell>
                      <TableCell>{moment.unix(visitCalls.visit_date/1000).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>
                        <Label
                          color={   
                            Math.floor((visitCalls.visit_date |moment('now', 'from', true))/86400000) > 0 ?                             
                              colors.green[600] : colors.red[600]}
                          variant="outlined"
                        >
                          {Math.floor((visitCalls.visit_date |moment('now', 'from', true))/86400000) + 5 }
                        </Label>
                      
                        
                      </TableCell>
                      
                      <TableCell>
                        {visitCalls.visitStatus ? (
                          <Label
                            className={classes.newItems}
                            color={colors.green[500]}
                            shape="rounded"
                          >
                            <DoneIcon />
                          </Label>

                        ): <Label
                          className={classes.newItems}
                          color={colors.orange[500]}
                          shape="rounded"
                        >
                          <CancelIcon />
                        </Label>
                        }
                        
                        
                      </TableCell>
                      <TableCell align="right">
                        {visitCalls.visitStatus  ? (
                          <Button
                            color="primary"
                            size="small"
                            disabled                            
                          >
                            <AddIcon className={classes.addIcon} 
                              onClick={event =>
                                handleCallOpen(event,visitCalls)
                              
                              }
                            />                          
                          
                          </Button>

                        ): 
                          <Button
                            color="primary"
                            size="small"
                          >
                            <AddIcon className={classes.addIcon} 
                              onClick={event =>
                                handleCallOpen(event,visitCalls)
                              
                              }
                            />
                          
                          </Button>
                        }
                        
                      </TableCell>
                    </TableRow>
                  )) : <p >No data, Click visit call to view</p>}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <AddCallVisit
          onClose={handleCallsClose}
          open={openCall}
          visitCalls= {selectedCall}
          visitServices= {visitServices}
          saveService = {saveService}
         
        />
      </Card>
    </div>
  );
};

PhoneCall.propTypes = {
  className: PropTypes.string
};

export default PhoneCall;
