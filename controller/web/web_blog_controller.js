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
                res.send("SUCCESS");
            }
        }catch(e){
            res.send("ERROR");
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
                res.redirect('/web/home');
            }else{
                res.send("ERROR");
            }
        }catch(e){
            res.send("ERROR");
        }
    }
    static async delete(req, res){}
}
module.exports = WebBlogController;