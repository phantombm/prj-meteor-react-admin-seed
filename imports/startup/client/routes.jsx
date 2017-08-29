import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from '../../ui/layouts/Layout';
import Main from '../../ui/pages/Main/Main';
import SignIn from '../../ui/pages/SignIn/SignIn';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/signIn" component={SignIn} />
      <Route path="/dashboard" component={Layout} />
      <Route path="/users" component={Layout} />
      <Route path="/ssams" component={Layout} />
      <Route path="/termsOfService" component={Layout} />
      <Route path="/privacyPolicy" component={Layout} />
      <Route path="/notices" component={Layout} />
      <Route path="/faqs" component={Layout} />
      <Route path="/remoteNotifications" component={Layout} />
      <Route path="/services" component={Layout} />
      <Route path="/serviceTypes" component={Layout} />
      <Route path="/chats" component={Layout} />
      <Route path="/brands" component={Layout} />
    </div>
  </Router>
);
