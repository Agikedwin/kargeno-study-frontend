import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography,Modal, } from '@material-ui/core';

import { Page, Paginate, SearchBar } from 'components';
import { Header, AddUserVisitServices, VisitServices } from './components';





//import { CREATE_ORGANIZATION } from '../../../../graphql/mutations/organization';

import { FETCH_VISITS_SERVICES, FETCH_VISITS } from '../../graphql/queries/app-queries';
import { CREATE_VISITS_SERVICES } from '../../graphql/mutations/app-mutations';




//import  {fetchOrganizations} from 'store/organization-actions';
import  {apiFetchData, apiSaveData } from 'store/api-actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UserVisitServices = ()=> {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);


  const [visits, setVisits] = useState([]);
  const [visitServices, setVisitServices] = useState([]);

  const [events, setEvents] = useState([]);

  //const  dispatch = useDispatch(); 



  const fetchVisitServices = async () => {
    await apiFetchData(FETCH_VISITS_SERVICES).then(res =>{  
      console.log('visits service', res.data.getVisitServices)
      setVisitServices(res.data.getVisitServices) 
     
    })
  }

  const fetchVisits = async () => {
    await apiFetchData(FETCH_VISITS).then(res =>{  
      setVisits(res.data.getVisits) 
     
    })
  }


  const saveResData = async(event) => {
    await apiSaveData(event,CREATE_VISITS_SERVICES).then(res =>{
    // setVisitServices(...visitServices, res.data.postVisitServices);
    });
  };

  useEffect(() => { 
    fetchVisitServices()  
    fetchVisits()   

  },[]);




  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });

  const handleModalClose = () => {
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventDelete = event => {
    setEvents(events => events.filter(e => e.id !== event.id));
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventEdit = event => {
    setEvents(events => events.map(e => (e.id === event.id ? event : e)));
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventNew = () => {
    setEventModal({
      open: true,
      event: null
    });
  };

  const handleFilter = () => {};
  const handleSearch = () => {};

 
  const handleEventAdd = event => {
    setEvents(events => [...events, event]);
    
    setEventModal({
      open: false,
      event: null
    });

    saveResData(event);
    //fetchVisitServices();
    
    
    
  };
  
  return (
    <Page
      className={classes.root}
      title="User Designation List"
    >
      <Header 
        onEventAdd={handleEventNew}
      />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />

      <div className={classes.results}>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
        
          {visitServices.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(visitServices.length / rowsPerPage)} 

        </Typography>
        {visitServices ? visitServices.map(visitService => (
          <VisitServices
            key={visitService.id}
            visitService={visitService}
          />
        )): <p> Record not found</p>}
      </div>
      <div className={classes.paginate}>
        <Paginate pageCount={3} />
      </div>

      <Modal
        onClose={handleModalClose}
        open={eventModal.open}
      >
        <AddUserVisitServices
          visits={visits}
          event={eventModal.event}
          onAdd={handleEventAdd}
          onCancel={handleModalClose}
          onDelete={handleEventDelete}
          onEdit={handleEventEdit}
        />
      </Modal>

     
    </Page>
  );
  
}

export default UserVisitServices