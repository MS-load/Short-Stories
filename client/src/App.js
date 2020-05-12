import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import HomePage from './HomePage'
import Register from './Register';
import Login from './Login'
//import Profile from './Profile'

function App() {
  const [login, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState('guest')
  return (

    

        <Login currentUser={currentUser}/>
        // <BrowserRouter>
        //   <div className="App">

        //   </div>


        // </BrowserRouter>

    
  );
}

export default App;
