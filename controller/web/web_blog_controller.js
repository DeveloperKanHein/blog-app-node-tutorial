const Blog = require("../../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;

class WebBlogController{
    static async create(req, res){
        res.render('create.ejs');
    }
    static async store(req, res){
        
        const blog = new Blog({
            user: new ObjectId(req.session.userId),
            title: req.body.title,
            description: req.body.description,
        });

        try{
            const isSave = await blog.save();
            if(isSave){
                req.flash('success', 'New blog is created successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'New blog can not be created!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'New blog can not be created!!!');
            res.redirect('/web/home');
        }
    }

    static async edit(req, res){
        const blog = await Blog.findById(req.params.id);
        res.render('edit.ejs', { blog });
    }
    static async update(req, res){
        const blog = await Blog.findById(req.body.id);
        blog.title = req.body.title;
        blog.description = req.body.description;
        try{
            const isSave = await blog.save();
            if(isSave){
                req.flash('success', 'Blog is updated successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'New blog can not be updated!!!');
            res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'New blog can not be updated!!!');
            res.redirect('/web/home');
        }
    }
    static async delete(req, res){
        const blog = await Blog.findById(req.params.id);
        try{
            const isDelete = await blog.deleteOne();
            if(isDelete){
                req.flash('success', 'Blog is deleted successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'New blog can not be deleted!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'New blog can not be deleted!!!');
            res.redirect('/web/home');
        }
    }
}
module.exports = WebBlogController;