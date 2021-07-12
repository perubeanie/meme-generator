/* react imports */
import { Link } from 'react-router-dom';
import { useState } from 'react';

/*bootstrap imports */
import { Table, Container, Button } from 'react-bootstrap';

/* importing icons */
import { BsTrash } from 'react-icons/bs'

/* imports from my files */
import { AddCopyMeme } from './MemeForms';
import { DeleteModal } from './MemeForms';

function MemeTable(props) {
    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Visibility</th>
                        <th>Creator</th>
                        <th>Status</th>
                        <th>Copy Button</th>
                        <th>Delete Button</th>
                    </tr>
                </thead>
                <tbody>
                    {props.memes.map(meme => <MemeRow key={meme.id} meme={meme} deleteMeme={props.deleteMeme} loggedIn={props.loggedIn} user={props.user} createMeme={props.createMeme} images={props.images} />)}
                </tbody>
            </Table>
        </Container>);
}

function MemeRow(props) {
    return (<tr>
        <MemeTitle meme={props.meme} />
        <MemeVisibility visibility={props.meme.visibility} />
        <MemeCreator creator={props.meme.creator} />
        <MemeStatus meme={props.meme} />
        <MemeCopy meme={props.meme} loggedIn={props.loggedIn} user={props.user} createMeme={props.createMeme} images={props.images} />
        <DeleteMeme meme={props.meme} deleteMeme={props.deleteMeme} loggedIn={props.loggedIn} user={props.user} />
    </tr >);
}

function MemeTitle(props) {
    return (
        <td>
            <Link to={{
                pathname: `/memeDescription`,
                state: { meme: props.meme }
            }}>
                {props.meme.title}
            </Link >
        </td>);
}

function MemeVisibility(props) {
    return (<td>{props.visibility}</td>);
}

function MemeCreator(props) {
    return (<td>{props.creator}</td>);
}

function MemeStatus(props) {
    return (<td>{props.meme.copy ? 'Copy' : 'From scratch'}</td>)
}

function MemeCopy(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    return (<td>
        <Button variant="info" onClick={handleShow} disabled={props.loggedIn ? false : true}>Copy</Button>
        <AddCopyMeme meme={props.meme} show={show} createMeme={props.createMeme} handleClose={handleClose} copyMode={1} user={props.user} images={props.images} />
    </td>);
}

function DeleteMeme(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    return (
        <td>
            <Button variant="info" onClick={handleShow} disabled={(props.loggedIn && props.meme.creator === props.user.name) ? false : true}>
                <BsTrash />
            </Button>
            <DeleteModal show={show} handleClose={handleClose} deleteMeme={props.deleteMeme} meme={props.meme} />
        </td>
    );
}



export { MemeTable, DeleteMeme };