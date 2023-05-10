import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography,Modal, } from '@material-ui/core';

import { Page, Paginate, SearchBar } from 'components';
import { Header, AccessLevel, AddEditEvent } from './components';





//import { CREATE_ORGANIZATION } from '../../../../graphql/mutations/organization';

import { FETCH_ACCES_LEVELS_QUERY } from '../../graphql/queries/app-queries';
import { CREATE_ACCESS_LEVEL } from '../../graphql/mutations/app-mutations';


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

const UserAccessLevels = ()=> {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);


  const [accessLevel, setAccessLevel] = useState([]);

  const [events, setEvents] = useState([]);

  //const  dispatch = useDispatch(); 



  const fetchAccessLevel = async () => {
    await apiFetchData(FETCH_ACCES_LEVELS_QUERY).then(res =>{  
      setAccessLevel(res.data.getLevels) 
     
    })
  }

  const saveResData = async(event) => {
    await apiSaveData(event,CREATE_ACCESS_LEVEL).then(res =>{
      setAccessLevel([...accessLevel, res.data.createLevel]);
    });
  };

  useEffect(() => {   
    fetchAccessLevel()   

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
    fetchAccessLevel();
    
    
    
  };
  
  return (
    <Page
      className={classes.root}
      title="User Access Level List"
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
          {accessLevel.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(accessLevel.length / rowsPerPage)}  
        </Typography>
        {accessLevel ? accessLevel.map(level => (
          <AccessLevel
            key={level.id}
            level={level}
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
        <AddEditEvent
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

export default UserAccessLevels