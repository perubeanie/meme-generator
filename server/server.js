'use strict';

const express = require('express');
const morgan = require('morgan');
const session = require('express-session'); // session middleware

const passport = require('passport');
const passportLocal = require('passport-local');

//importing DAOs
const memesDao = require('./memesDao');
const userDao = require('./userDao');

// initialize and configure passport
passport.use(new passportLocal.Strategy((username, password, done) => {
  // verification callback for authentication
  userDao.getUser(username, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Wrong username and/or password' });
  }).catch(err => {
    done(err);
  });
}));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

// initialize and configure HTTP sessions
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


//return all memes
app.get('/api/memes', isLoggedIn, (req, res) => {
  memesDao.listMemes()
    .then(memes => res.json(memes))
    .catch(() => res.status(500).end());
});

//return all public memes
app.get('/api/publicMemes', (req, res) => {
  memesDao.listPublicMemes()
    .then(memes => res.json(memes))
    .catch(() => res.status(500).end());
});

//create a new meme
app.post('/api/memes/createMeme', isLoggedIn, (req, res) => {
  
  const meme = {
    title : req.body.title,
    image: req.body.image,
    visibility : req.body.visibility,
    creator : req.user.name,
    sentence1 : req.body.sentence1,
    sentence2 : req.body.sentence2,
    sentence3 : req.body.sentence3,
    font : req.body.font,
    color : req.body.color,
    copy : req.body.copy,
  }
  
  memesDao.createMeme(meme)
    .then(() => res.end())
    .catch((error) => res.status(503).json({ error: `Database error during the creation of new task: ${err}.` }));
});

//delete a meme with a given id
app.delete('/api/memes/deleteMeme/:id', isLoggedIn, async (req, res) => {
  
  const id = req.params.id;

  try {
      await memesDao.deleteMeme(id);
      res.end();
  } catch (error) {
      res.status(503).json({ error: `Database error during the deletion of meme ${req.params.id}` });
  }
})

/*** Users APIs ***/

// login
app.post('/api/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
      if (err)
          return next(err);
      if (!user) {
          // display wrong login messages
          return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
          if (err)
              return next(err);

          // req.user contains the authenticated user, we send all the user info back
          // this is coming from userDao.getUser()
          return res.json(req.user);
      });
  })(req, res, next);
});

 
// logout
app.delete('/api/logout/current', (req, res) => {
  req.logout();
  res.end();
});


// check whether the user is logged in or not
app.get('/api/user/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});