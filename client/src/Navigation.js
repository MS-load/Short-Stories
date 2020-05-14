import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CenteredModal from './CenteredModal'
import { UserConsumer } from './Context/userContext'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

  render() {
    return (
      <UserConsumer>
        {currentUser => {
          return <div>
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{ background: '#88BDBC' }}>
              <Navbar.Brand>Short Stories</Navbar.Brand>
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
                      <Nav.Link className='text-white' onClick={() => {console.log('logout')}}>Logout</Nav.Link>
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