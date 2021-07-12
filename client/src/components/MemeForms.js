import { useState } from 'react';
import { Modal, Form, Alert, Button, FormLabel, Col } from 'react-bootstrap';

import { Redirect } from 'react-router-dom';

function AddCopyMeme(props) {

    const [title, setTitle] = useState(props.meme ? props.meme.title : '')
    const [image, setImage] = useState(props.meme ? props.meme.image : '');
    const [sentence1, setSentence1] = useState(props.meme ? props.meme.sentence1 : '');
    const [sentence2, setSentence2] = useState(props.meme ? props.meme.sentence2 : '');
    const [sentence3, setSentence3] = useState(props.meme ? props.meme.sentence3 : '');
    const [visibility, setVisibility] = useState(props.meme ? props.meme.visibility : '');
    const [color, setColor] = useState(props.meme ? props.meme.color : '');
    const [font, setFont] = useState(props.meme ? props.meme.font : '');
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [created, setCreated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (image === undefined) {
            setErrorMessage('Select an image first.');
            setShowAlert(true);
            return;
        }
        if (sentence1 === "" && sentence2 === "" && sentence3 === "") {
            setErrorMessage('You should fill at least one text box.');
            setShowAlert(true);
            return;
        }
        if (title === "" || color === "" || font === "" || visibility === "") {
            setErrorMessage('Fill all the remaining fields.');
            setShowAlert(true);
            return;
        }

        let meme = {
            title: title,
            image: image,
            visibility: visibility,
            sentence1: sentence1,
            sentence2: sentence2,
            sentence3: sentence3,
            font: font,
            color: color,
            copy: props.copyMode ? 1 : 0,
        }
        props.createMeme(meme);
        setCreated(true);
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.copyMode ? 'Copy Meme' : 'Add Meme'}</Modal.Title>
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
                        <Form.Label>Select a title</Form.Label>
                        <Form.Control type="text" value={title} onChange={ev => setTitle(ev.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select an image</Form.Label>
                        <Form.Control as="select"  disabled={props.copyMode ? true : false} value={image} onChange={ev => setImage(ev.target.value)}>
                            <option disabled hidden value=''></option>
                            <option>Winnie</option>
                            <option>Fry</option>
                            <option>CMM</option>
                            <option>Cardboard</option>
                            <option>Pigeon</option>
                            <option>CarExit</option>
                        </Form.Control>
                    </Form.Group>
                    {image ? <Form.Group>
                        <Form.Label>Select a text</Form.Label>
                        <Form.Control as="textarea" rows={1} value={sentence1} onChange={ev => setSentence1(ev.target.value)} />
                    </Form.Group> : <Form.Group />}
                    {(image && props.images[image].n_text > 1) ? <Form.Group>
                        <Form.Label>Select a text</Form.Label>
                        <Form.Control as="textarea" rows={1} value={sentence2} onChange={ev => setSentence2(ev.target.value)} />
                    </Form.Group> : <Form.Group />}
                    {(image && props.images[image].n_text > 2) ? <Form.Group>
                        <Form.Label>Select a text</Form.Label>
                        <Form.Control as="textarea" rows={1} value={sentence3} onChange={ev => setSentence3(ev.target.value)} />
                    </Form.Group> : <Form.Group />}
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Visibility</Form.Label>
                            <Form.Control as="select"  value={visibility} onChange={ev => setVisibility(ev.target.value)} disabled={(visibility === 'Protected' && props.copyMode && props.user && props.meme.creator !== props.user.name) ? true : false}>
                                <option disabled hidden value=''></option>
                                <option>Public</option>
                                <option>Protected</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <FormLabel>Color</FormLabel>
                            <Form.Control as="select" value={color} onChange={ev => setColor(ev.target.value)}>
                                <option disabled hidden value=''></option>
                                <option>White</option>
                                <option>Black</option>
                                <option>Red</option>
                                <option>Blue</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <FormLabel>Font</FormLabel>
                            <Form.Control as="select" value={font} onChange={ev => setFont(ev.target.value)}>
                                <option disabled hidden value=''></option>
                                <option>Impact</option>
                                <option>Arial</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" type="submit" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal >
            {created ? <Redirect to={'/'} /> : ''}
        </>
    );
}

function DeleteModal(props) {

    const [deleted, setDeleted] = useState(false);

    const handleSubmit = () => {
        props.deleteMeme(props.meme.id);
        props.handleClose();
        setDeleted(true);
    }

    return (
        <>
            <Modal show={props.show}>
                <Modal.Body>
                    <p>Are you sure you want to delete your meme?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="info" onClick={handleSubmit}>Yes!</Button>
                </Modal.Footer>
            </Modal>
            {deleted ? <Redirect to={'/'} /> : ''}
        </>
    );
}

export { AddCopyMeme, DeleteModal };