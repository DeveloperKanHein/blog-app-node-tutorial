const res_helper = require("../helper/res_helper");
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

    static async update(req, res){
        const comment = await Comment.findById(req.body.commentId);
        
        if(comment.user == req.session.userId){
            comment.data = req.body.data;
            try{
                const isSave = await comment.save();
                if(isSave){
                    req.flash('success', "Comment is updated successfully :)");
                    res.redirect('back');
                }else{
                    req.flash('success', "Comment cannot be updated :(");
                    res.redirect('back')
                }
            }catch(e){
                req.flash('success', "Comment cannot be updated :(");
                res.redirect('back')
            }
        }else{
            res_helper(res, null, "Acesss Denied");
        }
    }
    static async delete(req, res){
        
        try{
            const comment = await Comment.findOne({ _id: req.params.id, user: req.session.userId});
            const isDeleted = await comment.deleteOne();
            if(isDeleted){
                req.flash('success', "Comment is deleted successfully :)");
                res.redirect('back');
            }else{
                req.flash('success', "Comment cannot be deleted :(");
                res.redirect('back');
            }
        }catch(e){
            req.flash('success', "Comment cannot be deleted :(");
            res.redirect('back');
        }
    }
}
module.exports = CommentController;