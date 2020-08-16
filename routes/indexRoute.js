const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// home
router.get('/', (req, res) => {
  res.redirect('blogs')
})
//about
router.get('/about', (req, res) => {
  res.render('about', {title: 'about'})
})
//get all blogs
router.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt: 'desc'})
    .then(result => {
      res.render('index', {title: 'blogs', blogs: result})
    })
    .catch(err => console.log(err))
})
// create blog
router.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'create new blog'})
})
// create blog
router.post('/blogs', (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  })
  blog.save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})
//get single blog
router.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render('details', {title: 'details', blog: result})
    })
    .catch(err => console.log(err))
})
//delete blog
router.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => console.log(err))
})
// edit blog  
router.get('/edit/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render('edit', {title: 'edit', blog: result})
    })
    .catch(err => console.log(err))
})
//update blog
// create blog
router.put('/edit/:id', (req, res, next) => {
  const blog = new Blog({
    _id: req.params.id,
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  Blog.updateOne({_id: req.params.id}, blog)
  .then(result => {
    res.redirect('/')
  })
  .catch(err => console.log(err))
})

module.exports = router;