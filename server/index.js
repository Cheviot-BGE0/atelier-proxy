const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { API_KEY, PRODUCTS, RATINGS_AND_REVIEWS, QUESTIONS_AND_ANSWERS } = require('./config.js');
const app = express();
const port = 80;

var https = require('https');
var http = require('http');

https.globalAgent.maxSockets = 256;
http.globalAgent.maxSockets = 256;

const fallback = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc`;
const products = PRODUCTS || fallback;
const ratingsAndReviews = RATINGS_AND_REVIEWS || fallback;
const questionsAndAnswers = QUESTIONS_AND_ANSWERS || fallback;

const path = require('path');
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../../atelier-front-end/dist')));

app.all('/products*', (req, res) => {
  axios({
    method: req.method,
    url: `${products}${req.path}`,
    headers: { Authorization: API_KEY },
    params: req.query,
    data: req.body,
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
    url: `${ratingsAndReviews}${req.path}`,
    headers: { Authorization: API_KEY },
    params: req.query,
    data: req.body,
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
    url: `${questionsAndAnswers}${req.path}`,
    headers: { Authorization: API_KEY },
    params: req.query,
    data: req.body,
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
