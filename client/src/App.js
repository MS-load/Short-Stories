import React from 'react';
import Login from './Login'
import Register from './Register'
import { UserProvider } from './Context/userContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './HomePage'

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
