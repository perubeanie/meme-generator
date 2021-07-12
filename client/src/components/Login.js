import { useState } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };


        let valid = true;
        if (username === '' || password === '' || password.length < 6) {
            valid = false;
            setErrorMessage('Email cannot be empty and password must be at least six character long.');
            setShowAlert(true);
        }

        if (valid) {
            props.login(credentials)
                .then(() => props.handleClose())
                .catch((err) => { setErrorMessage(err); setShowAlert(true); });
        }

    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert
                    dismissible
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    variant="danger">
                    {errorMessage}
                </Alert>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={handleSubmit}>Login</Button>
            </Modal.Footer>
        </Modal>
    );
}


export { LoginForm };