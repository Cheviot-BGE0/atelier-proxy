const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const path = require('path');
const { error } = require('console');
app.use('/', express.static(path.join(__dirname, '../../atelier-front-end/dist')));

app.all('/products*', (req, res) => {
  // TODO
  if (req.headers.authorization) {
    axios({
      method: req.method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc${req.path}`,
      headers: {Authorization: req.headers.authorization},
      params: req.query
    })
      .then((serviceResponse) => {
        res.json(serviceResponse.data);
      })
      .catch((err) => {
        console.error(err.toJSON().message);
        if (error.response) {
          console.error(err.response.data);
        }
      });
  }
});

app.all('/reviews*', (req, res) => {
  // TODO
  if (req.headers.authorization) {
    axios({
      method: req.method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc${req.path}`,
      headers: {Authorization: req.headers.authorization},
      params: req.query
    })
      .then((serviceResponse) => {
        res.json(serviceResponse.data);
      })
      .catch((err) => {
        console.error(err.toJSON().message);
        if (error.response) {
          console.error(err.response.data);
        }
      });
  }
});

app.all('/qa*', (req, res) => {
  // TODO
  if (req.headers.authorization) {
    axios({
      method: req.method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc${req.path}`,
      headers: {Authorization: req.headers.authorization},
      params: req.query
    })
      .then((serviceResponse) => {
        res.json(serviceResponse.data);
      })
      .catch((err) => {
        console.error(err.toJSON().message);
        if (error.response) {
          console.error(err.response.data);
        }
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});