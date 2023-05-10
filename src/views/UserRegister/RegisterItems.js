import React from 'react'
import { Page } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Header, Users} from './components';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    
    margin: '0 auto',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}));

function RegisterItems() {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Register Users"
    >
      <Header />
      <Divider className={classes.divider} />
      <Users />
    </Page>
  )
}

export default RegisterItems