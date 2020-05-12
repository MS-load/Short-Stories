import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { UserConsumer } from './Context/userContext'
import { Redirect } from 'react-router-dom'

const Login = () => {
    const [authorized, setAuthorized] = useState(false)

    function resolveAfter2Seconds(props) {
        return new Promise(resolve => {
          setTimeout(() => {
              props.setUser({name: 'A'})
              resolve('resolved')

        //    props.setUser({name: 'A'})
          }, 2000);
        });
      }


    async function redirectToHome(props) {
       const result =  await  resolveAfter2Seconds(props)
       setAuthorized(true)
    }

    return (
        (!authorized) ?
            (<UserConsumer>
                {props => {
                    console.log(props)
                    return <div>
                        'Login Page'
            <Button onClick={()=>redirectToHome(props)} variant="primary" className="btn-sm">
                            Login </Button>
                    </div>
                }}
            </UserConsumer>
            ) : (
                <Redirect
                    to={{ pathname: "/"}}
                />
            )
    )
}

export default Login
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
            if (res.error) {
                console.log(res)
            } else {
                //this.props.history.push('/profile')
                
            }

        })
    }

    render() {
        return(
            <div className='container'>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className='text-light'>Sign in</h1>
                    <div className='form-group'>


                        <label htmlFor='email' className='text-light'>Email adress</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            placeholder='Enter email'
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password" className='text-light'>Password</label>
                        <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default Login
