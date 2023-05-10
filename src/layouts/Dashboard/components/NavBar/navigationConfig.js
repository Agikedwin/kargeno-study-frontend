/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { Label } from 'components';

export default [
  {
    title: 'Pages',
    pages: [
      
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        children: [
          
          {
            title: 'Overview',
            href: '/dashboards/analytics'
          }
        ]
      },
      {
        title: 'Registrations',
        href: '/management',
        icon: BarChartIcon,
        children: [
          {
            title: 'Access Levels',
            href: '/register/accesslevels'
          },
          {
            title: 'Designations',
            href: '/register/designation'
          },
          
          
          {
            title: 'New Project/Study',
            href: '/register/project'
          },
          {
            title: 'Register Visits',
            href: '/register/visits'
          },
          {
            title: 'Visit Services',
            href: '/register/services'
          },
          {
            title: 'New User',
            href: '/register/user'
          },
          
        ]
      },
      {
        title: 'Users',
        href: '/userlist',
        icon: PeopleIcon,
        children: [
          {
            title: 'View',
            href: '/listItems/users'
          },
          
          /*  {
            title: 'User Details',
            href: '/user/details/1/summary'
          } */
          
        ]
      },
     
   
    ]
  },

];
