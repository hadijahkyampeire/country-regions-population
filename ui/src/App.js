import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from 'containers';
import { People } from 'containers/people';
import { NavBar } from 'components';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/people" component={People} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null)(App);
