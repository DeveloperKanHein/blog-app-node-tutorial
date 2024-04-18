const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profile: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    createAt: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model('user', UserSchema);
  module.exports = User;