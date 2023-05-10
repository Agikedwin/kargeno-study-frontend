import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
  colors
} from '@material-ui/core';
import MaiIcon from '@material-ui/icons/MailOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import {  AddServices } from './components';

import { FETCH_VISITS , FETCH_VISITS_SERVICES, FETCH_LAST_SERVICE_PROVIDED, FETCH_ALL_VISIT_TYPES} from '../../../../../../graphql/queries/app-queries';
import { CREATE_PHYSICAL_SERVICES } from '../../../../../../graphql/mutations/app-mutations';

import  {apiFetchData , apiSaveData} from 'store/api-actions';
import {  useSelector , useDispatch } from 'react-redux';
import { Label } from 'components';
import  {getSelectedUserVisits } from 'store/api-actions';
import {useParams } from 'react-router-dom';







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
const labelColors = {
  0: colors.green[600],
  1: colors.orange[600],
  2: colors.red[600]
};


const VisitServices = props => {
  const {  className, ...rest } = props;
  const [visits, setVisits] = useState([]);
  const [visitsPhysical, setVisitsPhysical] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState([]);
  const [visitServices, setVisitServices] = useState([]);
  const [lastVisit, setLastVisit] = useState([]);
  const dispatch = useDispatch();
  let { id } = useParams();


  const searParams = {
    id: '',
    userId: '',
    visitId: '',
  }
  

  const selectedUser  = useSelector((state) => ({ ...state.accessLevel.selectedUser }));



  const classes = useStyles();

  const options = [
    'Resend last invoice',
    'Send password reset',
    'Send verification'
  ];

 
  const fetchAllVisitsTypes = async (searchId) => {
    console.log('FETCH_ALL_VISIT_TYPES    IDDD :: ', searchId);
    await apiFetchData(FETCH_ALL_VISIT_TYPES,searchId).then(res =>{  
      console.log(searchId, ' NEW SEARCH  :: ', res.data.getAllVisitTypes.physicalVisits);
      const validVisits =  res.data.getAllVisitTypes.filter(data => data.physicalVisits.length > 0   
      )
      //.filter(phones => phones.phoneCalls.length > 0 ? phones.phoneCalls._id : null);
      
      console.log('fetchAllVisitsTypes ***********  3:: ', validVisits);
      setVisits(validVisits) 
     
    })
  }


  const fetchVisitServices = async () => {
    await apiFetchData(FETCH_VISITS_SERVICES).then(res =>{  
      setVisitServices(res.data.getVisitServices) 
     
    })
  }

  const saveServicesOffred = async(payload) => {
    
    await  apiSaveData(payload,CREATE_PHYSICAL_SERVICES).then(res => {
      console.log('CREATE_SERVICES_OFFRED', res.data.postPhysicalServices)
    })

  }

  const fetchLastServiceOffered = async (payload) => {
    await apiFetchData(FETCH_LAST_SERVICE_PROVIDED, payload ).then(res => {
      setLastVisit(res.data.getLastServiceProvided);
      console.log('getLastServiceProvided ', res.data.getLastServiceProvided)
    })
  }


  useEffect(() =>{
    //fetchVisits();
    if(id){
      fetchVisitServices();
      fetchAllVisitsTypes(id);

    }
    
    

  },[id]);


  const [option, setOption] = useState(options[0]);



  const [openEnrol, setOpenEnroll] = useState(false);




  const handleEditOpen = (event,data) => {

    searParams.id = data.id;
    searParams.userId =selectedUser._id;
    searParams.visitId = data.id;


    setSelectedVisit(data);
    fetchLastServiceOffered(searParams);

    setOpenEnroll(true);
  };

  
  const handleEnrollClose = () => {
    setOpenEnroll(false);
  };
  const handleChange = event => {
    event.persist();

    setOption(event.target.value);
  };

  const saveService = (formState) => {

    saveServicesOffred(formState)
    setOpenEnroll(false);



  }
  const onClickCalls = (visitsDate) =>{
    dispatch(getSelectedUserVisits(visitsDate))


  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Study Visits" />
      <Divider />
      <CardContent className={classes.content}>
        <TextField
          fullWidth
          name="option"
          onChange={handleChange}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          value={option}
          variant="outlined"
        >
          {options.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </TextField>
        
        <Table className={classes.table}>
          <TableBody>
            { visits && visits.map(visit => (
              <TableRow key={visit._id}>
                
                <TableCell className={classes.cell}>
                  {visit.visitName} 
                </TableCell>                
                <TableCell className={classes.cell}>
                  {moment.unix(visit.physicalVisits[0].visit_date/1000).format('DD-MM-YYYY')} '  '
                 
                  {/* {moment(moment.unix(visit.physicalVisits[0].visit_date/1000).format('DD-MM-YYYY')).fromNow() or .toNow()} */}
                </TableCell>
                
                <TableCell className={classes.cell}>
                  {visit.dayFromBaseDate} {(visit.visitNumber <= 3) ? 'From V1' : 'From V3'}
                </TableCell>
                <TableCell  onClick={() => onClickCalls(visit) }>
                  <Label
                    color={labelColors['0']}
                    variant="outlined"
                  >
                    {visit.phoneCalls.length} Calls
                    
                    
                  </Label>
                </TableCell>
                
                { visit.physicalVisits[0].visitStatus ? (
                  <TableCell className={classes.cell}>
                    <Tooltip title="View">
                      <IconButton
                        onClick={event =>
                          handleEditOpen(event, visit)
                          
                        }
                        edge="end"
                        size="small"
                        disabled
                      >
                        {visit.physicalVisits[0].visitStatus}
                        <ArrowForwardIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ):
                  <TableCell className={classes.cell}>
                    <Tooltip title="Add">
                      <IconButton
                        onClick={event =>
                          handleEditOpen(event, visit)
                          
                        }
                        edge="end"
                        size="small"
                      >
                        {visit.physicalVisits[0].visitStatus}
                        <ArrowForwardIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>


                }
                

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>      

      <AddServices
        visit={selectedVisit}
        visitServices = {visitServices}
        onClose={handleEnrollClose}
        open={openEnrol}
        saveService={saveService}
        lastVisit = {lastVisit}
      />
    </Card>
  );
};

VisitServices.propTypes = {
  className: PropTypes.string,
  //customer: PropTypes.object.isRequired
};

export default VisitServices;
