import React from 'react';
import { UserProvider } from './Context/userContext';
import {Route, Switch } from 'react-router-dom'

import HomePage from './HomePage'
import Register from './Register';
import Login from './Login'

function App() {

  return (
      <UserProvider>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/" component={HomePage} basename="/Home" />
        </Switch>
      </UserProvider>
  );
}

export default App;
