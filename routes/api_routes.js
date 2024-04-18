const express = require('express');
const BlogController = require('../controller/blog_controller');
const route = express.Router();

route.get('/blogs', BlogController.getAllBlog);
route.post('/blog', BlogController.upload.single('photo'), BlogController.store);
route.put('/blog', BlogController.update);
route.delete('/blog/:id', BlogController.delete);

route.post('/comment', BlogController.createComment);
route.delete('/comment/:id/:commentId', BlogController.deleteComment);

module.exports = route;