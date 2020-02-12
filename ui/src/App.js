import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard, District } from 'containers';
import { People } from 'containers/people';
import { NavBar } from 'components';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/people" component={People} />
        <Route path="/district" component={District} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null)(App);
