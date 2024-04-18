
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const ObjectId = require("mongoose").Types.ObjectId;
const multer  = require('multer')
const path = require('path');

class BlogController{

    static blogStorage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/blog-images/')
        },
        filename: function (req, file, cb) {
            const exten = path.extname(file.originalname);
            cb(null, Date.now() + exten);
        }
    });

    static upload = multer({ storage: BlogController.blogStorage});

    static async getAllBlog(req, res){
        const blogs = await Blog.find().populate('user');
        res.send(blogs);
    }

    static async store(req, res){
        const blog = new Blog({
            user: new ObjectId(req.user.id),
            title: req.body.title,
            description: req.body.description
        });
        const isSave = await blog.save();
        if(isSave){
            res.send(blog);
        }
    }

    static async getAllComment(req, res){
        const comments = await Comment.find({ blog: req.params.id });
        res.send(comments);
    }

    static async createComment(req, res){
        const comment = new Comment({
            user: new ObjectId(req.user.id),
            data: req.body.comment
        });
        const isSave = await comment.save();
        if(isSave){
            res.send("SUCCESS");
        }
    }

    static async deleteComment(req, res){
        const blog = await Blog.findById(req.params.id);
        
        for(var i = 0; i < blog.comments.length; i++){
            if(blog.comments[i]._id == req.params.commentId){
                blog.comments.splice(i, 1);
                break;
            }
        }

        const isSave = await blog.save();
        if(isSave){
            res.send("Deleted");
        }
    }

    static async update(req, res){
        const blog = await Blog.findById(req.body.id);
        blog.title = req.body.title;
        blog.description = req.body.description;
        const isSave = await blog.save();
        if(isSave){
            res.send(blog);
        }
    }

    static async delete(req, res){
        const blog = await Blog.findById(req.params.id);
        const isDelete = await blog.deleteOne();
        if(isDelete){
            res.send("Deleted Successfully.");
        }
    }

}

module.exports = BlogController;