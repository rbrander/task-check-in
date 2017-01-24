// Server for website and REST API
// Note: this is run from the parent folder, meaning all paths are relative to the parent
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const sessions = require('client-sessions');

// const bcrypt = require('bcryptjs');
// const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
// if (bcrypt.compareSync(req.body.password, user.password)) ...


////////////////////////////////////////////////////
// Database

// Setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds127429.mlab.com:27429/task-check-in`);

// Create model
const User = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String
}), 'users');


////////////////////////////////////////////////////
// Middleware

app.use(express.static('./build'));
app.use(bodyParser.json());

/*
app.use(sessions({
  cookieName: 'session',
  secret: 'u@h32jk1isy%aSK9hisjIKJ2USlksui;wewjk;as;J3o;j2ioji9i22',
  duration: 30 * 60 * 1000, // half hour in milliseconds
  actionDuration: 5 * 60 * 1000, // 5 minutes in milliseconds
}))
*/




app.post('/api/signup', (req, res) => {
  // Check if the user exists (by email)
  User.findOne({ email: req.body.email}, function(err, user) {
    if (err) {
      console.error('Error: ', err);
      res.sendStatus(500);
    } else {
      // if user not found...
      if (!user) {
        // Create the user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // Save the user
        newUser.save((err) => {
          if (err) console.error('Error creating user', err.message);
          else {
            // TODO: login the user
            res.redirect('/');
          }
        })
      } else {
        res.json({ error: 'email already exists' });
        res.sendStatus(400);        
      }
    }
  });
});

/*
const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        req.session.reset();
        res.redirect('/login');
      } else {
        // user session is valid

      }
    })
  } else res.redirect('/login');
}


app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email}, function(err, user) {
    if (!user) {
      res.sendStatus(404);
    } else {
      if (user.password === reqbody.password) {
        req.session.user = user; // save the user object in the session
        res.redirect('/home');
      } else
        res.sendStatus(401);
    }
  })
});

*/


app.get('/api/logout', (req, res) => {
  /*
  if (res.session)
    res.session.reset();
  */
  res.redirect('/');
});




const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});
