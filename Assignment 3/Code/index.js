const express = require('express');
require('dotenv').config();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const authRoutes = require('./routes/authRoutes');


const app = express();
const port = process.env.PORT;

app.use(express.json());
require('./database/db');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.IS_USER_BASE_URL,
};
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/api/load', (req, res) => {
  const delay = Math.floor(Math.random() * 10000) + 500;
  setTimeout(() => {
    res.status(200).json({
      status: 'success',
      message: 'Load request processed after delay',
      delay: `${delay}`,
    });
  }, delay);
});

app.use('/api/v1/user', authRoutes);


app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
