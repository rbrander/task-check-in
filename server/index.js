// Server for website and REST API
// Note: this is run from the parent folder, meaning all paths are relative to the parent
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
// const sessions = require('client-sessions');

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

const Task = mongoose.model('Task', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  description: String,
  progress: String,
  startDate: Date,
  endDate: Date,
  goal: Number
}), 'tasks');


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
      console.error('User findOne Error: ', err);
      res.sendStatus(500);
    } else {
      // if user not found...
      if (!user) {
        // Create the user
        const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        const newUser = new User({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: passwordHash,
        });
        // Save the user
        console.log(newUser.name, newUser.email);
        newUser.save((err) => {
          if (err) {
            console.error('Error creating user', err.message);
            res.sendStatus(500);
          } else {
            // TODO: login the user
            res.json({ name: newUser.name, email: newUser.email });
          }
        })
      } else {
        res.status(400).json('email already exists');
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


app.post('/api/login', (req, res) => {
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

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (!user) {
      console.log('user not found');
      // res.sendStatus(404); // 404 - not found
      // For security reasons, it's best to avoid telling the user the account doesn't exist
      res.sendStatus(401); // instead pretend it's just the wrong password
    }
    else {
      console.log("user found, now let's see if their password is cool");
      if (bcrypt.compareSync(password, user.password)) {
        console.log("yep, they're legit! :)");
        res.json({ name: user.name, email: user.email });
      }
      else {
        console.log('nope... wrong password');
        res.sendStatus(401); // 401 - unauthorized
      }
    }
  });
});


app.get('/api/logout', (req, res) => {
  /*
  if (res.session)
    res.session.reset();
  */
  res.redirect('/');
});

app.get('/api/tasks', (req, res) => {
  // TODO: add a filter for userid
  Task.find({}, function(err, taskList) {
    if (err) {
      console.error('User findOne Error: ', err);
      res.sendStatus(500);
    } else if (!taskList) {
      res.json([]);
    } else {
      res.json(taskList);
    }
  });
});

app.post('/api/tasks', (req, res) => {
  console.log('/api/tasks');
  console.log('req.body =', req.body);
  const newTask = new Task(req.body);
  newTask.save((err) => {
    if (err) console.error('Error creating user', err.message);
    else {
      console.log('successfully saved new task: ', newTask);
      res.json(newTask);
    }
  });
});

// catch all route
app.get('/*/', (req, res) => res.redirect('/'));


const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});
