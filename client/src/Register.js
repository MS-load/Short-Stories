import React, { Component } from 'react'
import { register } from './UserFunctions'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      user_name: '',
      email: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      user_name: this.state.user_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser)
  
  }
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={(e) => this.onSubmit(e)}>
              <h1 className="h3 mb-3 font-weight-normal text-light">Register</h1>
              <div className="form-group">
                <label htmlFor="name"  className=' text-light'>User name</label>
                <input
                  type="text"
                  className="form-control"
                  name="user_name"
                  placeholder="Enter your user name"
                  value={this.state.user_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"  className=' text-light'>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"  className=' text-light'>Password</label>
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
