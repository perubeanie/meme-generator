/* Bootstrap imports */
import { Navbar, Button, Nav } from 'react-bootstrap';

/* React imports */
import { useState } from 'react';
import { Link } from 'react-router-dom';

/* Imports from my files */
import { LoginForm } from './Login';

/* importing icons */
import { FiLogIn } from 'react-icons/fi';
import { BsFillImageFill } from 'react-icons/bs';


function Navigation(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    return (
        <Navbar bg="info" variant="dark" >
            <Link to={`/`}>
                <Navbar.Brand id="app_name">
                    <BsFillImageFill/>{' '} Meme Generator
                </Navbar.Brand>
            </Link>
            {props.loggedIn ?
                <Nav className="ml-auto">
                    <Navbar.Text className="mx-3" id="welcome_message">{`Welcome, ${props.user.name}!`}</Navbar.Text>
                    <Logout logOut={props.logOut} />
                </Nav> :
                <Nav className="ml-auto">
                    <Button variant="light" onClick={handleShow}><FiLogIn />{' '}Login</Button>
                    <LoginForm show={show} handleClose={handleClose} handleShow={handleShow} login={props.login} />
                </Nav>
            }
        </Navbar >
    );
}

function Logout(props) {
    return (
        <Link to={`/`}>
            <Button variant="light" onClick={props.logOut}>Logout</Button>
        </Link>
    );
}

export { Navigation };