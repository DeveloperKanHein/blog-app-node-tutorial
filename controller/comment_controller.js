const Comment = require("../models/comment");
const ObjectId =require("mongoose").Types.ObjectId;

class CommentController{
    static async all(req, res){
        const comments = await Comment.find({ blog: new ObjectId(req.params.id) }).populate('user');
        res.render("comments", { blogId: req.params.id, comments, message: req.flash('success')});
    }

    static async store(req, res){
        const comment = new Comment({
            blog: new ObjectId(req.body.blog),
            user: new ObjectId(req.session.userId),
            data: req.body.data
        });
        try{
            const isSave = await comment.save();
            if(isSave){
                req.flash('success', "New comment is created successfully :)");
                res.redirect('back');
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log(e);
            req.flash('success', "Comment can not be created :(");
            res.redirect('back');
        }
    }
    static async edit(req, res){}
    static async update(req, res){
        const comment = await Comment.findById(req.body.id);
        comment.data = req.body.data;
        try{
            const isSave = await comment.save();
            if(isSave){
                res.send("Success");
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log(e);
            res.send(e);
        }
    }
    static async delete(req, res){
        const comment = await Comment.findById(req.params.id);
        try{
            const isDeleted = await comment.deleteOne();
            if(isDeleted){
                res.send("Success");
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log(e);
            res.send(e);
        }
    }
}
module.exports = CommentController;