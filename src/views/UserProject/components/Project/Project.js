import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors
} from '@material-ui/core';

import getInitials from 'utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

const Project = props => {
  const { program, className, ...rest } = props;
  //console.log('AccessLeve ========== 000:',project)

  const classes = useStyles();

  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600]
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
     
        <div className={classes.stats}>
          <Typography variant="h6">
            {program.id}
          </Typography>
          <Typography variant="body2">Identifier</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{program.programName}</Typography>
          <Typography variant="body2">Project/Study</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{program.owner}</Typography>
          <Typography variant="body2">Owner</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{program.description}</Typography>
          <Typography variant="body2">Description</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(program.date_created).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Created</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(program.date_updated).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Updated</Typography>
        </div>
        <div className={classes.stats}>
          <Typography
            style={{ color: statusColors['#757575'] }}
            variant="h6"
          >
            {program.status}
          </Typography>
          <Typography variant="body2">Status</Typography>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

Project.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
};

export default Project