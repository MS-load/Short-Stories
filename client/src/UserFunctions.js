import axios from 'axios'

export const register = newUser => {
  axios
    .post('http://localhost:5000/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
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
