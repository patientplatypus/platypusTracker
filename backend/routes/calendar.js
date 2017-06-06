var express = require('express');
var router = express.Router();
var Goals = require('../models/goalsSchema');

/* GET home page. */


router.post('/alldateinfo', function(req,res,next){
  Goals.find({}, function(err,posts){
    res.json(posts);
  });
});


router.post('/specificdateinfo', function(req,res,next){
  console.log('inside specificdateinfo');
  console.log('req.body.datequery ', req.body.datequery);
  Goals.find({dateDue:req.body.datequery}, function(err,posts){
    res.json(posts);
  });
});


//name: "*emailed" + name
//actionType: email
//notes: "email body"+text+{?followupemaildates}
//dateDue: date.now() (cleaned)


router.post('/addgoal', function(req,res,next){

  var goal = new Goals({
    name: req.body.name,
    actionType: req.body.actionType,
    notes: req.body.notes,
    dateSubmitted: req.body.dateSubmitted,
    dateDue: req.body.dateDue,
    location: req.body.location
  })

  goal.save(function(err,post){
    if (err) {return next(err)}
    res.json(200, post)
  })

})


router.patch('/modifygoal', function(req,res,next){
  Goals.findById({_id: req.body.id}, function(err, goal){
    if (err) console.log(err);
    console.log('value of goal in router patch is ', goal);
    console.log('value of the body is ', req.body);
    goal.name = req.body.name || goal.name;
    goal.location = req.body.location || goal.location;
    goal.notes = req.body.notes || goal.notes;

    goal.save(function(err, goal){
      if (err) console.log(err);
      res.json({
        status: 'updated!',
        goal: goal
      });
    });

  });
});




// router.patch('/modifyreport', function(req, res, next) {
//   Student.findById({
//     _id: req.body.studentid
//   }, function(err, student) {
//     if (err) console.log(err);
//
//
//     student.report.forEach(function(report,index){
//       if(report._id == req.body.reportid){
//         console.log('match found!!!!!!!')
//         report.date = req.body.date || report.date;
//         report.vitals = req.body.vitals || report.vitals;
//         report.symptoms = req.body.symptoms || report.symptoms;
//         report.notes = req.body.notes || report.notes;
//       }
//     });
//
//     student.save(function(err, student) {
//       if (err) console.log(err);
//
//       res.json({
//         status: 'updated!',
//         updated_report: student
//       });
//     });
//
//   });
// });



router.delete('/deleteItem/:delete_id',function(req,res,next){
  console.log("inside delete method");

  Goals.remove({
           _id: req.params.delete_id
       }, function(err, goal) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted',
                      post: goal});
       });

  });


module.exports = router;
