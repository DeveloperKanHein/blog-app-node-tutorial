const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    title: { type: String, default: null},
    description: { type: String, default: null },
    createAt: { type: Date, default: Date.now },
  });
  
  const Blog = mongoose.model('blog', BlogSchema);
  module.exports = Blog;