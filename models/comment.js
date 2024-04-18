
  const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog'},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  data: { type: String, default: null},
  createAt: { type: Date, default: Date.now },
});
  
  const Comment = mongoose.model('comment', CommentSchema);
  module.exports = Comment;