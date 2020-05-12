import React, { Component } from 'react';
import { login } from  './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({  [e.target.name]: e.target.value })

    }
    onSubmit(e) {
        e.preventDefault()
        
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res => {
            if (res) {
                //this.props.history.push('/profile')
            }
        })
    }

    render() {
        return(
            <div className='container'>
                
            </div>
        )
    }
}