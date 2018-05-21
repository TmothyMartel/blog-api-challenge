'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model');

// starter data 
BlogPosts.create(
	'First cool post',
	 'neato info here', 
	 'Mr. Author'
	 );
BlogPosts.create(
	'all about the things',
	"So the things are like this but also not like that",
	'Mr. Author'
	);
BlogPosts.create(
	'Lorem ipsum post',
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	"Tim M."
	);

// Routes

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	requiredFields.forEach( field => {
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		} else {
			return field;
		}
	});
	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(post);
});

// router.delete('/:id', (req, res) => {

// });

// router.put('/:id', jasonParser, (req, res) => {

// });

module.exports = router;