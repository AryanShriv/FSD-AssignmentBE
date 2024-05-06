const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  "fullName": { type: String },
  "email": { type: String },
  "password": { type: String },
  deviceName: { type: String },
  browser: { type: String },
  loginHistory: [{
    deviceName: { type: String },
    browser: { type: String },
    loginTime: { type: Date, default: Date.now },
    token: { type: String },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
