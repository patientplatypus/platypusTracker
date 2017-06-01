// models/race.js
var mongoose = require('mongoose');
// var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
// {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now}

var schema = new mongoose.Schema({
  body: { type: String, required: false },
  type: { type: String, required: false },
  company: { type: String, required: false },
  addressee: { type: String, required: false },
  emailAddress:  { type: String, required: false }
});

var Templates = mongoose.model('Templates', schema);

module.exports = Templates;
