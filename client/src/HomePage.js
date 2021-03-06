import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CenteredModal from './CenteredModal'
import Navbar from './Navigation'
import { UserConsumer } from './Context/userContext'
import errorMessage from './errorMessage'

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

    logout(currentUser) {
        
        axios.post('http://localhost:5000/users/logout', currentUser.user.token)
            .then(res => {
                console.log(res)
                currentUser.setUser({ name: '', id: '', isAdmin: false, token: '' })
                alert('Session time-out you have been logged out')
            }).catch(error => {
                console.log(error)
            })
    }

    deleteStory(storyToDelete, currentUser) {
        // console.log(storyToDelete)
        storyToDelete.token = currentUser.user.token
        axios.delete('http://localhost:5000/stories', { data: storyToDelete })
            .then(res => {
                this.setState({ update: !this.state.update })
                console.log('123')
            }).catch(error => {
                console.log(error)
                if (error.response) {
                        if(error.response.status === 403){
                            this.logout(currentUser)
                        }                 
                }
            })
    }

    editStory(storyToEdit, currentUser) {
        console.log({ storyToEdit })
        //   console.log(storyToEdit)
        axios.put('http://localhost:5000/stories', storyToEdit)
            .then(res => {
                this.setState({ update: !this.state.update })
            }).catch(error => {
                console.log(error)
                if (error.response) {
                        if(error.response.status === 403){
                            this.logout(currentUser)
                        }                 
                }
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
                if (error.response) {
                        if(error.response.status === 403){
                            this.logout()
                        }                 
                }
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
                {currentUser => {
                    console.log(currentUser.user)
                    return <div>
                        <Navbar addStory={this.addStory} />
                        <Container className='mt-5 card-columns'>
                            {this.state.stories.map(story =>
                                <div className='bg-transparent' key={story._id}>
                                    <Card className="text-center mt-2" >
                                        <Card.Header className="text-left p-2">{story.author}</Card.Header>
                                        <Card.Body style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                            <Card.Title>{story.title}</Card.Title>
                                            <Card.Text>{story.body}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted d-flex justify-content-between p-2">
                                            <Button variant="outline-danger" className="btn-sm"
                                                onClick={(e) => this.deleteStory(story, currentUser)}
                                                style={{ visibility: currentUser.user.id === story.userId || currentUser.user.isAdmin === true ? 'show' : 'hidden' }}
                                            >
                                                Delete</Button>
                            updated: {(story.updatedAt).substring(0, 10)}
                                            <Button variant="outline-primary" className="btn-sm btn-outline-info"
                                                onClick={() => this.setState({ modal: true, modelStory: story })}
                                                style={{ visibility: currentUser.user.id === story.userId || currentUser.user.isAdmin === true ? 'show' : 'hidden' }}
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
                                token={currentUser.user.token}
                                operation='edit'
                                currentUser={currentUser}
                            />
                        </Container>
                    </div>
                }}
            </UserConsumer>
        )
    }
}

