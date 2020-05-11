import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CenteredModal from './CenteredModal'
import Navbar from './Navigation'

export default class StoriesList extends React.Component {
    

    render() {
        return (
            <>
                <Navbar currentUser={this.props.currentUser} addStory={this.addStory} />
                <Container sm={12} md={8} lg={6} className='mt-5'>

                    <CenteredModal
                        show={this.state.modal}
                        onHide={() => this.setState({ modal: false })}
                        story={this.state.modelStory}
                        submitForm={this.editStory}
                        operation='edit'
                    />
                </Container>
            </>
        )
    }
}
