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

const AccessLevel = props => {
  const { level, className, ...rest } = props;
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
        <div className={classes.header}>
          <Avatar
            alt="Author"
            className={classes.avatar}
            src='/images/avatars/avatar_5.png'
          >
            {getInitials(level.level_name)}
          </Avatar>
          <div>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
            >
              {level.title}
            </Link>
            <Typography variant="body2">
              Id{' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/management/customers/1"
                variant="h6"
              >
                {level._id}
              </Link>
            </Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {level.level_name}
          </Typography>
          <Typography variant="body2">Role</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{level.description}</Typography>
          <Typography variant="body2">Priviledge</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(level.date_created).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Created</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(level.date_updated).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Updated</Typography>
        </div>
        <div className={classes.stats}>
          <Typography
            style={{ color: statusColors['#757575'] }}
            variant="h6"
          >
            {level.level_id}
          </Typography>
          <Typography variant="body2">Project status</Typography>
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

AccessLevel.propTypes = {
  className: PropTypes.string,
  level: PropTypes.object.isRequired
};

export default AccessLevel