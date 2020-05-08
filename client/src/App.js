import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;