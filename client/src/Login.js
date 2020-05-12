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