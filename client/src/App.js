import './App.css';

/* Bootstrap imports */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Toast } from 'react-bootstrap';

/* React imports */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

/* Image imports */
import winnieThePooh from "./images/Winnie-The-Pooh.png";
import fryFuturama from "./images/Futurama-Fry.jpg";
import changeMyMind from "./images/Change-My-Mind.png";
import cardboard from "./images/Guy-Holding-Cardboard-Sign.jpg";
import pigeon from "./images/Is-This-A-Pigeon.jpg";
import carLeftExit from "./images/Left-Exit-12.jpg";

/* Imports from my files */
import { MemeTable } from './components/MemeList';
import { Navigation } from './components/Navigation';
import { MemeDescription } from './components/MemeDescription';
import { AddCopyMeme } from './components/MemeForms';
import API from './API';

function Image(title, n_text, position1 = '', position2 = '', position3 = '') {
  this.title = title;
  this.n_text = n_text;
  this.position1 = position1;
  this.position2 = position2;
  this.position3 = position3;
}

let winnie = new Image(winnieThePooh, 2, 'winnie-top', 'winnie-bottom');
let fry = new Image(fryFuturama, 2, 'fry-top', 'fry-bottom');
let cmm = new Image(changeMyMind, 1, 'cmm-text');
let cb = new Image(cardboard, 1, 'cb-text');
let pigeon_ = new Image(pigeon, 3, 'pigeon-top', 'pigeon-center', 'pigeon-bottom');
let carExit = new Image(carLeftExit, 3, 'exit-left', 'exit-right', 'exit-bottom');

const images = {
  Winnie: winnie,
  Fry: fry,
  CMM: cmm,
  Cardboard: cb,
  Pigeon: pigeon_,
  CarExit: carExit,
}

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMemes, setSelectedMemes] = useState([]);
  const [show, setShow] = useState(false);
  const [dirty, setDirty] = useState(true);
  const [message, setMessage] = useState('');

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleErrors = (err) => {
    setMessage({ msg: err.error, type: 'danger' });
    console.log(err);
  }

  useEffect(() => {
    if (dirty) {
      if (loggedIn) {
        API.loadAllMemes().then((memes) => { setSelectedMemes(memes) });
        setDirty(false);
      }
      else {
        API.loadPublicMemes().then((memes) => { setSelectedMemes(memes) });
        setDirty(false);
      }
    }
  }, [dirty, loggedIn]);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      setDirty(true);
    }
    catch (err) {
      throw err;
    }
  }

  const handleLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setDirty(true);
    setUser(null);
  }

  const createMeme = async (meme) => {
    API.createMeme(meme)
    .then(() => setDirty(true))
    .catch(e => handleErrors(e));
  }

  const deleteMeme = async (id) => {
    API.deleteMeme(id)
      .then(() => setDirty(true))
      .catch(e => handleErrors(e));
  }

  return (
    <Router>
      <Navigation login={doLogIn} loggedIn={loggedIn} user={user} logOut={handleLogOut} />

      <Toast show={message !== ''} onClose={() => setMessage('')} delay={3000} autohide>
        <Toast.Body>{message?.msg}</Toast.Body>
      </Toast>

      <Switch>
        <Route exact path={`/`}>
          <MemeTable memes={selectedMemes} deleteMeme={deleteMeme} loggedIn={loggedIn} user={user} createMeme={createMeme} images={images} />
          <Button variant="info" size="lg" className="fixed-right-bottom" onClick={handleShow} disabled={loggedIn ? false : true}>+</Button>
          <AddCopyMeme show={show} handleClose={handleClose} createMeme={createMeme} user={user} images={images} />
        </Route>
        <Route path="/memeDescription" render={() => <MemeDescription images={images} deleteMeme={deleteMeme} loggedIn={loggedIn} user={user} createMeme={createMeme} />} />
        <Route>
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
