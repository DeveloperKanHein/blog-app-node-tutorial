const express = require('express');
const WebAuthController = require('../controller/web_auth_controller');
const HomeBlogController = require('../controller/home_blog_controller');
const WebBlogController = require('../controller/web/web_blog_controller');
const route = express.Router();

route.get('/home', HomeBlogController.home);
route.get('/create-blog', WebBlogController.create);
route.post('/blog', WebBlogController.store);
route.get('/blog-edit/:id', WebBlogController.edit);
route.post('/blog-update', WebBlogController.update);
route.get('/blog-delete/:id', WebBlogController.delete);

route.get('/like/:id', HomeBlogController.like);
route.get('/unlike/:id/', HomeBlogController.unlike);
route.get('/liked-users/:id', HomeBlogController.likedUsers);

module.exports = route;