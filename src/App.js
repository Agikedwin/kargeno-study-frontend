import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from './graphql/apolloClient';

import theme from './theme';
import { configureStore } from './store';
import routes from './routes';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';

const history = createBrowserHistory();
const store = configureStore();
// eslint-disable-next-line no-console
console.log('graphql client started', client);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <ScrollReset />
              <GoogleAnalytics />
              <CookiesNotification />
              {renderRoutes(routes)}
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};


export default App;
