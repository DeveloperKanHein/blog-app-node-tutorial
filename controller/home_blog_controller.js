const Blog = require("../models/blog");

class HomeBlogController{
    static async home(req, res) {
        const blogs = await Blog.find().populate('user');
        res.render('home.ejs', { blogs });
    }
}

module.exports = HomeBlogController;