import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CenteredModal from './CenteredModal'
import { UserConsumer } from './Context/userContext'
import axios from 'axios'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

  logout(currentUser) {
      axios.post('http://localhost:5000/users/logout', currentUser.user.token)
      .then(res => {
        console.log(res)
        currentUser.setUser({ name: '', id: '', isAdmin: false, token: '' })
      }).catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <UserConsumer>
        {currentUser => {
          return <div>
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{ background: '#88BDBC' }}>
              <Navbar.Brand>
                <Link className='text-white font-weight-bold' to='/'>
                  Short Stories
              </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className='text-white' onClick={() => this.setState({ modal: true })}
                    style={{ display: currentUser.user.token === '' ? 'none' : 'block' }}>
                    Add a story </Nav.Link>
                  <Nav.Link style={{ display: currentUser.user.isAdmin === true ? 'block' : 'none' }}>All users</Nav.Link>
                </Nav>
                <Nav style={{ display: currentUser.user.token === '' ? 'block' : 'none' }}>
                  <Link className="nav-item mr-5 text-white" to='/Login'>Login</Link>
                  <Link className="nav-item mr-2 text-white" to='/Register'>Register</Link>
                </Nav>
                <Nav style={{ display: currentUser.user.token === '' ? 'none' : 'flex' }}>
                  <Navbar.Text className='text-white mr-5'>{currentUser.user.name}</Navbar.Text>
                  <Nav.Link className='text-white' onClick={() => this.logout(currentUser)}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <CenteredModal
                show={this.state.modal}
                onHide={() => this.setState({ modal: false })}
                submitForm={this.props.addStory}
                token={currentUser.user.token}
                operation='add'
              />
            </Navbar>
          </div>
        }}
      </UserConsumer>

    );
  }
}