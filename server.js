'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
	res.send(It is working!)
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});