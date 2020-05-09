import React from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export default class StoriesList extends React.Component {
    state = {
        storiesDisplay: [],
        stories: [],
        showEditOptions: false
    }



    componentDidMount() {
        axios.get(`http://localhost:5000/stories?page=1&limit=3`)
            .then(res => {
                const storiesDisplay = res.data;
                const stories = res.data.allStories;

                this.setState({ stories });
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log(this.state.stories)
        return (
            <Container sm={12} md={8} lg={6} className='mt-5' >
                {this.state.stories.map(story =>
                    
                    <Col md = { 6} className = 'bg-transparent'>
                    <Card className="text-center mt-2">
                        <Card.Header className="text-left">{story.author}</Card.Header>
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Text>{story.body}</Card.Text>
                            <Button variant="primary">Read More</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted d-flex justify-content-between">
                            <Button variant="outline-danger" className="btn-sm"
                            style = {{this.props.currentUser === story.author || this.props.currentUser === 'admin' ? visibility:'show' : visibility:'hidden'}}
                            >
                                Delete</Button>
                            updated: {(story.updatedAt).substring(0, 10)}

                            <Button variant="outline-primary" className="btn-sm">Edit</Button>
                        </Card.Footer>
                    </Card>

                    </Col>

        )
    }


            </Container>
        )
    }
}

// const container: React.CSSProperties = {
//     visibility: 
// }