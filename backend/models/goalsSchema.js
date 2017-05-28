// models/race.js
var mongoose = require('mongoose');
// var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
// {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now}

var schema = new mongoose.Schema({
  name: { type: String, required: false },
  actionType: { type: String, required: false },
  notes: { type: String, required: false },
  dateSubmitted: { type: String, required: false },
  dateDue: { type: String, required: false },
  timeDue: {type: Date, default: Date.now},
  location: {type: String, required: false},
  id: {type: Date, default: Date.now}
});

var Goals = mongoose.model('Goals', schema);

module.exports = Goals;
