// models/race.js
var mongoose = require('mongoose');
// var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
// {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now}

var schema = new mongoose.Schema({
  linkedIn: { type: String, required: false },
  name: { type: String, required: false },
  profilePic: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  github: { type: String, required: false },
  notes: { type: String, required: false }
});

var Contacts = mongoose.model('Contacts', schema);

module.exports = Contacts;
