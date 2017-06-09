var express = require('express');
var router = express.Router();
var Goals = require('../models/goalsSchema');
var Jobs = require('../models/jobsSchema');
var Contacts = require('../models/contactsSchema');
var request = require('request');
var cheerio = require('cheerio');

router.post('/test', function(req,res,next){
  request('http://www.google.com/', function(err, resp, html) {
          if (!err){
            $ = cheerio.load(html);
            console.log($('body').text());
        }
  });
});


router.post('/addcontact', function(req,res,next){

  var contact = new Contacts({
    linkedIn: req.body.linkedIn,
    name: req.body.name,
    profilePic: req.body.profilePic,
    email: req.body.email,
    phone: req.body.phone,
    github: req.body.github,
    notes: req.body.notes
  });

  contact.save(function(err,post){
    if (err) {return next(err)}
    res.json(200, post)
  });

});


router.post('/allcontactinfo', function(req,res,next){
  Contacts.find({}, function(err,posts){
    res.json(posts);
  });
});


router.delete('/deleteContact/:delete_id',function(req,res,next){
  console.log("inside delete method");
  console.log('value of req.params.delete_id is', req.params.delete_id);

  Contacts.remove({
           _id: req.params.delete_id
       }, function(err, contact) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted',
                      post: contact});
       });
  });




module.exports = router;
