import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


export default class CenteredModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault()
        let values
        if (this.props.operation === 'edit') {
            values = {
                title: document.querySelector('[name="storyTitle"]').value,
                body: document.querySelector('[name="storyBody"]').value,
                _id: this.props.story._id
            }
        }
        else {
            values = {
                title: document.querySelector('[name="storyTitle"]').value,
                body: document.querySelector('[name="storyBody"]').value,
                author: this.props.addAuthor
            }
        }
        this.props.submitForm(values)
        this.props.onHide()
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                centered='true'
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {(!this.props.story) ? `${this.props.addAuthor}` : `${this.props.story.author}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group controlId="storyTitle">
                            <Form.Label>Story Title</Form.Label>
                            <Form.Control
                                required
                                name='storyTitle'
                                type="text"
                                placeholder="your title"
                                defaultValue={(!this.props.story) ? '' : `${this.props.story.title}`}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a title
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="storyBody">
                            <Form.Label>Story</Form.Label>
                            <Form.Control as="textarea" rows="5"
                                name='storyBody'
                                required
                                placeholder="your story"
                                defaultValue={(!this.props.story) ? '' : `${this.props.story.body}`}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a story
            </Form.Control.Feedback>

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>)
    }
}

