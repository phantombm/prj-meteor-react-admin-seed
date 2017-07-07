import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Main from '../../ui/pages/Main/Main';
import Layout from '../../ui/layouts/Layout';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <div>
      <Route exact path="/" component={ Layout } />
      <Route exact path="/links" component={ Main } />
    </div>
  </Router>
);
