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
    constructor(props) {
        super(props);
        this.state = {
            storiesDisplay: [],
            stories: [],
            update: false,
            modal: false,
            modalStory: {},
        }
        this.deleteStory = this.deleteStory.bind(this)
        this.editStory = this.editStory.bind(this)
        this.addStory = this.addStory.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/stories`)
            .then(res => {
                const storiesDisplay = res.data;
                const stories = res.data.allStories;
                this.setState({ stories });
            }).catch(error => {
                console.log(error)
            })
    }

    deleteStory(storyToDelete) {
        console.log(storyToDelete)
        axios.delete('http://localhost:5000/stories', { data: storyToDelete })
            .then(res => {
                console.log(res.data)
                this.setState({ update: !this.state.update })
            }).catch(error => {
                console.log(error)
            })
    }

    editStory(storyToEdit) {
        console.log({ storyToEdit })
        axios.put('http://localhost:5000/stories', storyToEdit)
            .then(res => {
                this.setState({ update: !this.state.update })
            }).catch(error => {
                console.log(error)
            })
    }

    addStory(storyToAdd) {
        console.log(storyToAdd)
        console.log('checkpoint')
        axios.post('http://localhost:5000/stories', storyToAdd)
            .then(res => {
                console.log(Response)
                this.setState({ update: !this.state.update })
            }).catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.update !== this.state.update) {
            console.log('UPDATED')
            axios.get(`http://localhost:5000/stories`)
                .then(res => {
                    const stories = res.data.allStories;
                    this.setState({ stories });
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <>
                <Navbar currentUser={this.props.currentUser} addStory={this.addStory} />
                <Container sm={12} md={8} lg={6} className='mt-5 card-columns'>
                    {this.state.stories.map(story =>
                        <div className='bg-transparent' key={story._id}>
                            <Card className="text-center mt-6">
                                <Card.Header className="text-left">{story.author}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{story.title}</Card.Title>
                                    <Card.Text>{story.body}</Card.Text>
                                    {/* <Button variant="primary">Read More</Button> */}
                                </Card.Body>
                                <Card.Footer className="text-muted d-flex justify-content-between">
                                    <Button variant="outline-danger" className="btn-sm" onClick={(e) => this.deleteStory(story)}
                                        style={{ visibility: this.props.currentUser === story.author || this.props.currentUser === 'admin' ? 'show' : 'hidden' }}
                                    >Delete</Button>
                            updated: {(story.updatedAt).substring(0, 10)}
                                    <Button variant="outline-primary" className="btn-sm" onClick={() => this.setState({ modal: true, modelStory: story })}
                                        style={{ visibility: this.props.currentUser === story.author || this.props.currentUser === 'admin' ? 'show' : 'hidden' }}
                                    >Edit</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    )
                    }
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
