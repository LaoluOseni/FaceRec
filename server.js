const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const knex = require('knex')({
    client: 'pg',
    connection: { 
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

//knex is used to link server side logic with database.

//controllers for requests
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image')


//Middleware
app.use(express.json());
app.use(cors());

//path handlers
app.get('/', (req, res) => { res.send('working') });

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on ${process.env.PORT}`)
});