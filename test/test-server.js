'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Post', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should list items on GET', function() {
		return chai.request(app)
			.get('/blog-post')
			.then(res => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('array');
				expect(res.body.length).to.be.at.least(1);
				const expectedKeys = ['id', 'title', 'content', 'author'];
				res.body.forEach(item => {
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				})
			});
	});

	it('should add an item on POST', function() {
		const newBlogPost = {
			title: 'the test post', 
			content: 'this is a new post for testing',
			author: 'Tim M',
		}

		return chai.request(app)
			.post('/blog-post')
			.send(newBlogPost)
			.then(res => {
				expect(res).to.have.status(201);
				expect(res).to.be.json
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
				expect(res.body.id).to.not.equal(null);
			});
	});

	it('should update an item with PUT', function() {
		const updateBlogPost ={
			title: 'First cool post',
	 		content: 'I added more info here', 
	 		author: 'Mr. Author'
		}

		return chai.request(app)
			.get('/blog-post')
			.then(res => {
				updateBlogPost.id = res.body[0].id
				return chai.request(app)
					.put(`/blog-post/${updateBlogPost.id}`)
					.send(updateBlogPost);
			})
			.then(res => {
				expect(res).to.have.status(204);
			});
	});

	it('should delete items on DELETE', function() {
		return chai.request(app)
		.get('/blog-post')
		.then(res => {
			return chai.request(app)
			.delete(`/blog-post/${res.body[0].id}`);
		})
		.then(res => {
			expect(res).to.have.status(204);
		});
	});
});