


// var schema = new mongoose.Schema({
//   name: { type: String, required: false },
//   actionType: { type: String, required: false },
//   notes: { type: String, required: false },
//   dateSubmitted: {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now},
//   dateDue: {type: FormatDate, format: 'MM-DD-YYYY', default: Date.now},
//   timeDue: {type: Date, default: Date.now},
//   location: {type: String, required: false}
// });


require('dotenv').config({ silent: true });

var mongoose = require('mongoose');
mongoose.connect(process.env.platypus_tracker_db_conn);

var Goals = require('./models/goalsSchema');

var goalData = [
  { name: 'Outcomes Review',
    actionType: 'Outcomes',
    notes: 'Make sure you have all the outcomes stuff needed. Check the checklist! You need to be there for a 12:30-1pm meeting.',
    dateSubmitted: '5/27/2017',
    dateDue: '6/1/2017',
    location: 'weWork: 600 Congress'
  },
  { name: 'Outcomes Standup',
    actionType: 'Outcomes',
    notes: 'Compare charted progress and right a review before standup on what has been done. Also right down what will be accomplished by next standup',
    dateSubmitted: '5/27/2017',
    dateDue: '6/5/2017',
    location: 'zoom link: https://generalassembly.zoom.us/j/2392046778?pwd=&status=success'
  },
];

Goals.create(goalData, function(err, goals) {
  console.log('inside Goals create');
  if (err) {
    console.log('Database Error: ', err);
  }

  console.log('Goals inserted: ', goals);
  process.exit();
});
