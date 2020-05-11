import React, {useState} from 'react';


import HomePage from './HomePage'
import Register from './Register';

function App() {
  const [login, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState('guest')
  return (

    <>

        {/* <HomePage currentUser={currentUser}/> */}
        <Register currentUser={currentUser}/>

    </>
  );
}

export default App;
