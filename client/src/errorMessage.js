import React from 'react'
import Toast from 'react-bootstrap/Toast'

function errorMessage(props) {
    return (
        <Toast
            style={{
                position: 'absolute',
                top: '10%',
                right: 0,
            }}
            onClose={props.onClose} show={props.show} delay={4000} autohide>
            <Toast.Body><strong>{props.text}</strong></Toast.Body>
        </Toast>
    )
}

export default errorMessage
