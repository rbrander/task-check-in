// Server for website and REST API
// Note: this is run from the parent folder, meaning all paths are relative to the parent
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const sessions = require('client-sessions');

// const bcrypt = require('bcryptjs');
// const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
// if (bcrypt.compareSync(req.body.password, user.password)) ...

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/dbname');
/*
const User = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
}));
*/


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
  console.log('signup!');
  console.log({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  res.redirect('/');

  // res.sendStatus(200);
  
  /*
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  // TODO: check if the user already exists

  user.save(function (err){
    if (err)
      console.error('error creating user');
    else
      res.redirect('/home');
  })

  // data POSTed is in req.body
  res.end();
  // res.sendStatus(200);
  */
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
