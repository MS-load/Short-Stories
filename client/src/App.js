import React, {useState} from 'react';


import HomePage from './HomePage'

function App() {
  const [login, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState('guest')
  return (

    <>

        <HomePage currentUser={currentUser}/>

    </>
  );
}

export default App;
