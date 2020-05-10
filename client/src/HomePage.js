import React from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export default class StoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storiesDisplay: [],
            stories: [],
            update: false,
            showEditOptions: false
        }
        this.deleteStory = this.deleteStory.bind(this)
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
                this.setState(prevState => ({
                    update: !prevState.update
                }))
            }).catch(error => {
                console.log(error)
            })
    }

    editStory() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.update !== this.state.update) {
            console.log('UPDATED')
            axios.get(`http://localhost:5000/stories`)
                .then(res => {
                    // const storiesDisplay = res.data;
                    const stories = res.data.allStories;
                    this.setState({ stories });
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    closeModal(){
        this.setState({
          showModal: false,
        });
    }
    
    openModal(){
        this.setState({
          showModal: true,
        });
    }
    
    saveSandbox(event){
        console.log("Hello World");
        name: this.refs.bundleName.value;
        console.log(name);
    }

    render() {
        console.log(this.state.stories)
        return (
            <Container sm={12} md={8} lg={6} className='mt-5' >
                {this.state.stories.map(story =>
                    <Col md={6} className='bg-transparent' key={story._id}>
                        <Card className="text-center mt-2">
                            <Card.Header className="text-left">{story.author}</Card.Header>
                            <Card.Body>
                                <Card.Title>{story.title}</Card.Title>
                                <Card.Text>{story.body}</Card.Text>
                                {/* <Button variant="primary">Read More</Button> */}
                            </Card.Body>
                            <Card.Footer className="text-muted d-flex justify-content-between">
                                <Button variant="outline-danger" className="btn-sm" onClick={(e) => this.deleteStory(story)}
                                    style={{ visibility: this.props.currentUser === story.author || this.props.currentUser === 'admin' ? 'show' : 'hidden' }}
                                >
                                    Delete</Button>
                            updated: {(story.updatedAt).substring(0, 10)}

                                <Button variant="outline-primary" className="btn-sm" onClick={(e) => this.editStory(story)}
                                    style={{ visibility: this.props.currentUser === story.author || this.props.currentUser === 'admin' ? 'show' : 'hidden' }}
                                >Edit</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
                }
                
            </Container>
        )
    
    }
}
