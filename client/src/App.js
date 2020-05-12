import React, { useState } from 'react';
import { UserProvider } from './Context/userContext'

import HomePage from './HomePage'

function App() {
  const user = { name: 'D', loggedIn: true }
  // const [login, setLogin] = useState(false)
  // const [currentUser, setCurrentUser] = useState('guest')
  return (
    <UserProvider value={user}>
      <HomePage />
    </UserProvider>

  );
}

export default App;
