import axios from 'axios'

export const register = newUser => {
  console.log('test')
  axios
    .post('http://localhost:5000/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log(res)
    })
    
    .catch(err => {
      console.log('testing')
    })
}

export const login = user => {
  return axios
    .post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:5000/users/profile', {
      
    })
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}