import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import Navbar from './components/Navbar'
// import './index.css'

ReactDOM.render(
  (
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
  )
  , document.getElementById('root'))