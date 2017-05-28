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





module.exports = router;
