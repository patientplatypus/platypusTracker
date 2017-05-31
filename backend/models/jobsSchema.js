//jobTitle jobLink companyName jobLocation jobDescription

// models/race.js
var mongoose = require('mongoose');
// var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
// {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now}

var schema = new mongoose.Schema({
  jobTitle: { type: String, required: false },
  jobLink: { type: String, required: false },
  companyName: { type: String, required: false },
  jobLocation: { type: String, required: false },
  jobDescription: { type: String, required: false },
  jobStatus: { type: String, required: false }
});

var Jobs = mongoose.model('Jobs', schema);

module.exports = Jobs;
