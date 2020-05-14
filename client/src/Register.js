import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navigation'
import ErrorMessage from './errorMessage'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      user_name: '',
      email: '',
      password: '',
      loginSuccess: false,
      error: false,
      errorMessage: ''
    }

    this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  verifyRegister() {

    const newUser = {
      user_name: this.state.user_name,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5000/users/register', newUser)
      .then(res => {
        if (res.statusText === 'OK') {
          console.log('check')
         this.setState({ loginSuccess: true })
        }
      })
      .catch(err => {
        this.setState({ error: true })
        this.setState({ errorMessage: `${err.response.data}` })
      })

  }

  async redirectToLogin(e) {
    e.preventDefault()
    console.log('checkpoint')
    
    const result = await this.verifyRegister()

    //if(result) return console.log('result:')
    // if (res.status === 'ok') {
    //     this.setState({ authorized: true })
    //     console.log(this.state.authorized)
    // }
  }

  render() {
    return (
      (!this.state.loginSuccess) ?
        (<>
          <Navbar />
          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={(e) => this.redirectToLogin(e)}>
                  <h1 className="h3 mb-3 font-weight-normal text-light">Register</h1>
                  <div className="form-group">
                    <label htmlFor="name" className=' text-light'>User name</label>
                    <input
                    required
                      type="text"
                      className="form-control"
                      name="user_name"
                      placeholder="Enter your user name"
                      value={this.state.user_name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className=' text-light'>Email address</label>
                    <input
                    required
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className=' text-light'>Password</label>
                    <input
                    required
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
                    Register
              </button>
                </form>
              </div>
            </div>
            <ErrorMessage onClose={() => this.setState({ error: false })} show={this.state.error} text={this.state.errorMessage} />
          </div>
        </>)
        :

        (
          <Redirect
            to={{ pathname: "/Login" }}
          />
        )
    )
  }
}

export default Register
