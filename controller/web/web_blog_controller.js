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
    static async edit(req, res){}
    static async update(req, res){}
    static async delete(req, res){}
}
module.exports = WebBlogController;