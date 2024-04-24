const Blog = require("../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;

class HomeBlogController{
    static async home(req, res) {
        const blogs = await Blog.find().populate('user');
        res.render('home.ejs', { blogs, message: req.flash('success') });
    }

    static async like(req, res){
        try{
            const blog = await Blog.findById(req.params.id);
            blog.likes.push(new ObjectId(req.session.userId));
            const isSave = await blog.save();
            if(isSave){
                req.flash('success', 'You liked a post.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'You can not like a post.');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'You can not like a post.');
            res.redirect('/web/home');
        }
    }

    static async unlike(req, res){
        try{
            const blog = await Blog.findById(req.params.id);
            
            for(var i = 0; i < blog.likes.length; i++){
                if(blog.likes[i] == req.session.userId){
                    blog.likes.splice(i, 1);
                    break;
                }
            }
            const isSave = await blog.save();
            if(isSave){
                req.flash('success', 'You unliked a post.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'You can not unlike a post.');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'You can not unlike a post.');
            res.redirect('/web/home');
        }
    }

    static async likedUsers(req, res){
        const blog = await Blog.findById(req.params.id).populate('likes');
        console.log(blog);
        res.render("liked_user.ejs", {likes: blog.likes});
    }
}

module.exports = HomeBlogController;