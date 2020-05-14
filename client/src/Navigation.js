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

                  <Nav.Link onClick={() => this.setState({ modal: true })}
                    style={{ visibility: currentUser.user.token === '' ? 'hidden' : 'show' }}>
                    Add a story </Nav.Link>
                  <Nav.Link style={{ visibility: currentUser.user.token === '' ? 'hidden' : 'show' }}>My Stories</Nav.Link>
                </Nav>
                <Nav>
                  <Link to='/Login'>Login</Link>
                  <Link to='/Register'>Register</Link>
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