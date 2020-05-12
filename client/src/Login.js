import React from 'react'
import Button from 'react-bootstrap/Button'
import { UserConsumer } from './Context/userContext'
import { Redirect } from 'react-router-dom'
import { login } from './UserFunctions'
import axios from 'axios'
import ErrorMessage from './errorMessage'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            authorized: false,
            error: false,
            errorMessage: ''

        }
        this.onChange = this.onChange.bind(this)
        //this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    // onSubmit(e) {
    //     e.preventDefault()

    //     
    //     login(user).then(res => {
    //         if (res.error) {
    //             console.log(res)
    //         } else {
    //             //this.props.history.push('/profile')

    //         }

    //     })
    // }

    resolveAfter2Seconds(props) {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/users/login', { user })
            .then(res => {
                return res
            })
            .catch(err => {
                this.setState({error: true})
                console.log(err.response)
                this.setState({errorMessage: `${err.response.data}`})
            })
    }



    async redirectToHome(props, e) {
        e.preventDefault()
        console.log('checkpoint')
        const result = await this.resolveAfter2Seconds(props)
        console.log(result, 'check')
        // if (res.status === 'ok') {
        //     this.setState({ authorized: true })
        //     console.log(this.state.authorized)
        // }
    }

    render() {
        return (
            (!this.state.authorized) ?
                (<UserConsumer>
                    {props => {
                        console.log(props)
                        return <div>
                            <div className='container'>
                                <form noValidate onSubmit={(e) => this.redirectToHome(props, e)}>
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
                            <ErrorMessage onClose={() => this.setState({error: false})} show={this.state.error} text={this.state.errorMessage}/>
                        </div>
                    }}
                </UserConsumer>
                ) :

                (
                    <Redirect
                        to={{ pathname: "/" }}
                    />
                )
        )
    }
}

