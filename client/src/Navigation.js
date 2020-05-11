import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CenteredModal from './CenteredModal'


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

 
  render(){
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{ background: '#88BDBC' }}>
        <Navbar.Brand>Short Stories</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <Nav.Link onClick={() => this.setState({ modal: true})}
            style={{ visibility: this.props.currentUser !== 'guest' ? 'show' : 'hidden', color: '#1e14de'  }}>
            Add a story </Nav.Link>
            <Nav.Link  style={{ visibility: this.props.currentUser !== 'guest' ? 'show' : 'hidden', color: '#1e14de'  }}>My Stories</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: '#1e14de' }}>Login</Nav.Link>
            <Nav.Link style={{ color: '#1e14de' }}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CenteredModal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
          addAuthor={this.props.currentUser}
          submitForm={this.props.addStory}
          operation='add'
        />
      </Navbar>
    );
  }
}