const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'krishen',
    password: '',
    database: 'face-recognition'
  }
});

// db.select('*')
//   .from('users')
//   .then((data) => {
//     console.log(data);
//   });

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json('Unable to register'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status('400').json('User not found');
      }
    })
    .catch((err) => res.status(400).json('Error getting user'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('Unable to get entries'));
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
