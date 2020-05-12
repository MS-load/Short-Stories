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
