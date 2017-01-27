// Server for website and REST API
// Note: this is run from the parent folder, meaning all paths are relative to the parent
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sessions = require('client-sessions');

////////////////////////////////////////////////////
// Database

// Setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose's mpromise is deprecated

// Connect
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds127429.mlab.com:27429/task-check-in`);

// Create model
const User = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String,
}), 'users');

const Task = mongoose.model('Task', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  owner_id: mongoose.Schema.ObjectId,
  name: String,
  description: String,
  progress: String,
  startDate: Date,
  endDate: Date,
  goal: Number,
  completions: Array,
}), 'tasks');


////////////////////////////////////////////////////
// Middleware

app.use(express.static('./build'));
app.use(bodyParser.json());
app.use(sessions({
  cookieName: 'session',
  secret: 'u@h32jk1isy%aSK9hisjIKJ2USlksui;wewjk;as;J3o;j2ioji9i22',
  duration: 30 * 60 * 1000, // half hour in milliseconds
  actionDuration: 5 * 60 * 1000, // 5 minutes in milliseconds
}));
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});


////////////////////////////////////////////////////
// Routes

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
        newUser.save((err) => {
          if (err) {
            console.error('Error creating user', err.message);
            res.sendStatus(500);
          } else {
            // TODO: login the user
            let clonedUser = Object.assign({}, newUser);
            delete clonedUser.password;
            delete clonedUser.__v;
            res.json(clonedUser);
            //res.json({ name: newUser.name, email: newUser.email });
          }
        })
      } else {
        res.status(400).json('email already exists');
      }
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (!user) {
      // res.sendStatus(404); // 404 - not found
      // For security reasons, it's best to avoid telling the user the account doesn't exist
      res.sendStatus(401); // instead pretend it's just the wrong password
    } else {
      // Now that we have a user record, check the password
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        // remove the password before sending
        let clonedUser = JSON.parse(JSON.stringify(user));
        delete clonedUser.password;
        delete clonedUser.__v;
        res.json(clonedUser);
        // res.json({ _id: user._id, name: user.name, email: user.email });
      }
      else {
        res.sendStatus(401); // 401 - unauthorized
      }
    }
  });
});

app.get('/api/logout', (req, res) => {
  if (res.session)
    res.session.reset();
  res.json({});
});

app.get('/api/tasks', (req, res) => {
  Task.find({ owner_id: req.session.user._id }, function(err, taskList) {
    if (err) {
      console.error('Task find Error: ', err);
      res.sendStatus(500);
    } else if (!taskList) {
      res.json([]);
    } else {
      res.json(taskList);
    }
  });
});

app.post('/api/task/create', (req, res) => {
  const newTask = new Task(req.body);
  newTask.save((err) => {
    if (err) {
      console.error('Error creating user', err.message);
      res.sendStatus(500);
    } else {
      res.json(newTask);
    }
  });
});

app.post('/api/task/completed', (req, res) => {
  // TODO: verify user is logged in
  // TODO: check if the current session user is the owner of the task
  Task.findOne({ _id: req.body.task_id }, (err, task) => {
    if (err) {
      console.error('Error finding task!', err)
      res.sendStatus(500);
    } else if (!task) {
      res.sendStatus(404);
    } else {
      task.completions = (task.completions || []).concat(req.body.date);
      task.save((err, task, numAffected) => {
        if (err) {
          console.error('Error saving task', err);
          res.sendStatus(500);
        } else if (numAffected === 0) {
          console.error('Task did NOT update!');
          res.sendStatus(500);
        } else {
          // assume success
          res.json(task);
        }
      });
    }
  });
});

// catch all route
app.get('/*/', (req, res) => res.redirect('/'));


const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});
