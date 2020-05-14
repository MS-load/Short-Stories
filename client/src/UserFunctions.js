import axios from 'axios'

export const register = newUser => {
  axios
    .post('http://localhost:5000/users/register', {
      user_name: newUser.user_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => {
      console.log('testing')
    })
}

export const login = user => {
 axios
    .post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
