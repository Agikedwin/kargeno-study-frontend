import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography,Modal, } from '@material-ui/core';

import { Page, Paginate, SearchBar } from 'components';
import { Header, Visits,AddVisits } from './components';





//import { CREATE_ORGANIZATION } from '../../../../graphql/mutations/organization';

import { FETCH_VISITS, FETCH_PROGRAM } from '../../graphql/queries/app-queries';
import { CREATE_VISITS } from '../../graphql/mutations/app-mutations';





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

const UserDesignation = ()=> {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);


  const [programs, setPrograms] = useState([]);
  const [visits, setVisits] = useState([]);

  const [events, setEvents] = useState([]);

  //const  dispatch = useDispatch(); 



  const fetchPrograms = async () => {
    await apiFetchData(FETCH_PROGRAM).then(res =>{  
      setPrograms(res.data.getPrograams) 
     
    })
  }

  const fetchVisits = async () => {
    await apiFetchData(FETCH_VISITS).then(res =>{  
      console.log('Get Visits', res.data)
      setVisits(res.data.getVisits) 
     
    })
  }


  const saveResData = async(event) => {
    await apiSaveData(event,CREATE_VISITS).then(res =>{
      setVisits([...visits, res.data.postVisits]);
    });
  };

  useEffect(() => { 
    fetchVisits()  
    fetchPrograms()   

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
    fetchVisits();
    
    
    
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
          {visits.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(visits.length / rowsPerPage)}  
        </Typography>
        {visits ? visits.map(visit => (
          <Visits
            key={visit._id}
            visit={visit}
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
        <AddVisits
          programs={programs}
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

export default UserDesignation