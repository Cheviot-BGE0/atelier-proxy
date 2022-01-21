const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const API_KEY = require('./config.js').API_KEY;
const app = express();
const port = 80;

var https = require('https');
var http = require('http');

https.globalAgent.maxSockets = 256;
http.globalAgent.maxSockets = 256;

const path = require('path');
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../../atelier-front-end/dist')));

app.all('/products*', (req, res) => {
  axios({
    method: req.method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc${req.path}`,
    headers: {Authorization: API_KEY},
    params: req.query,
    data: req.body
  })
    .then((serviceResponse) => {
      res.json(serviceResponse.data);
    })
    .catch((err) => {
      console.error(err.toJSON().message);
      if (err.response) {
        console.error(err.response.data);
        res.status(err.response.status).send(err.response.data);
      }
    });
});

app.all('/reviews*', (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:3003${req.path}`,
    headers: {Authorization: API_KEY},
    params: req.query,
    data: req.body
  })
    .then((serviceResponse) => {
      res.status(serviceResponse.status).json(serviceResponse.data);
    })
    .catch((err) => {
      console.error(err.toJSON().message);
      if (err.response) {
        console.error(err.response.data);
        res.status(err.response.status).send(err.response.data);
      }
    });
});

app.all('/qa*', (req, res) => {
  axios({
    method: req.method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc${req.path}`,
    headers: {Authorization: API_KEY},
    params: req.query,
    data: req.body
  })
    .then((serviceResponse) => {
      res.json(serviceResponse.data);
    })
    .catch((err) => {
      console.error(err.toJSON().message);
      if (err.response) {
        console.error(err.response.data);
        res.status(err.response.status).send(err.response.data);
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});