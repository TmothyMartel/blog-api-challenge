'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const blogPostRouter = require('./blogPostRouter')

app.use(morgan('common'));

app.get('/', (req, res) => {
	res.send('It is working!');
});

app.use('/blog-post', blogPostRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});