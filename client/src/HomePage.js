import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CenteredModal from './CenteredModal'
import Navbar from './Navigation'
import { UserConsumer } from './Context/userContext'

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
                console.log(res)
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
            <UserConsumer>
                {props => {
                    console.log(props)
                    return <div>
                        <Navbar currentUser={props.user.name} addStory={this.addStory} />
                        <Container sm={12} md={8} lg={6} className='mt-5'>
                            {this.state.stories.map(story =>
                                <Col md={6} className='bg-transparent' key={story._id}>
                                    <Card className="text-center mt-2" >
                                        <Card.Header className="text-left p-2">{story.author}</Card.Header>
                                        <Card.Body style={{maxHeight: '150px', overflowY: 'auto'}}>
                                            <Card.Title>{story.title}</Card.Title>
                                            <Card.Text>{story.body}</Card.Text>
                                            {/* <Button variant="primary">Read More</Button> */}
                                        </Card.Body>
                                        <Card.Footer className="text-muted d-flex justify-content-between p-2">
                                            <Button variant="outline-danger" className="btn-sm" onClick={(e) => this.deleteStory(story)}
                                                style={{ visibility: props.user.name === story.author || props.user.name === 'admin' ? 'show' : 'hidden' }}
                                            >
                                                Delete</Button>
                            updated: {(story.updatedAt).substring(0, 10)}
                                            <Button variant="outline-primary" className="btn-sm" onClick={() => this.setState({ modal: true, modelStory: story })}
                                                style={{ visibility: props.user.name === story.author || props.user.name === 'admin' ? 'show' : 'hidden' }}
                                            >Edit</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
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
                    </div>
                }}
            </UserConsumer>
        )
    }
}
