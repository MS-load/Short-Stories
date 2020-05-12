import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import HomePage from './HomePage'
import Register from './Register';
import Login from './Login'

function App() {
  const [login, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState('guest')
  return (

    

        {/* <HomePage currentUser={currentUser}/> */}
        // // <BrowserRouter>
        // //   <div className='App'>
        // //     <Navigation />
        // //     <Switch />

        // //       <Route exact path="/register" component={Register} />
        // //       <Route exact path="/login" component={Login} />
        // //       {/* <Route exact path="/profile" component={Profile} /> */}
        // //     <Switch />
        // //   </div>

        // // <BrowserRouter/>

    
  );
}

export default App;
