var express = require('express');
var router = express.Router();
var Templates = require('../models/templatesSchema');
var schedule = require('node-schedule');
var moment = require('moment-timezone');
const fs = require('fs');

/* GET users listing. */
router.post('/sendemail', function(req, res, next) {

 var email     = require("emailjs");
 var server    = email.server.connect({
  user:    req.body.username,
  password:req.body.password,
  host:    "smtp.gmail.com",
  port:    465,
  ssl:     true
});

 const attachmentArray = req.body.attachments.map((attachment) => {
     var filetype = attachment.slice(-3);
     if (filetype === "pdf") {
       filetype = "application/pdf";
     } else {
       filetype = "image/"+filetype;
     }

     return {
         path: __dirname+"/uploads/"+attachment,
         type: filetype,
         name: attachment
     }
 })

 server.send({
    text:    req.body.text,
    from:    req.body.username,
    to:      req.body.receiver,
    subject: req.body.subject,
    cc: req.body.username,
    attachment: attachmentArray
 }, function(err, message) {
   if (err) res.send('error from sending email');
    res.send('email sent successfully');

  });

});


// attachment:
// [
//    {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
//    {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
// ]

// body: { type: String, required: false },
// type: { type: String, required: false },
// company: { type: String, required: false },
// addressee: { type: String, required: false },
// emailAddress:  { type: String, required: false }


router.post('/addtemplate', function(req,res,next){

  var template = new Templates({
    body: req.body.body,
  });

  template.save(function(err,post){
    if (err) {return next(err)}
    res.json(200, post)
  });

});

// var schedule = require('node-schedule');
// var date = new Date(2012, 11, 21, 5, 30, 0);
//
// var j = schedule.scheduleJob(date, function(){
//   console.log('The world is going to end today.');
// });
//
// Say you very specifically want a function to execute at 5:30am on December 21, 2012. Remember - in JavaScript - 0 - January, 11 - December.

router.post('/delayedemail', function(req,res,next){
  console.log('top of delayedemail');
  var requser = req.body.username;
  var reqpassword = req.body.password;
  var reqtext = req.body.text;
  var reqreceiver = req.body.receiver;
  var reqsubject = req.body.subject;
  var reqattachments = req.body.attachments;
  var reqoneWeek = req.body.oneWeek;
  var reqtwoWeek = req.body.twoWeek;
  var reqthreeWeek = req.body.threeWeek;
  var reqtoday = req.body.today
  var reqfourWeek = req.body.fourWeek;
  var reqoneWeekaheadDate = req.body.oneWeekaheadDate;
  var reqtwoWeekaheadDate = req.body.twoWeekaheadDate;
  var reqthreeWeekaheadDate = req.body.threeWeekaheadDate;
  var reqfourWeekaheadDate = req.body.fourWeekaheadDate;
  var jfired1 = false;
  var jfired2 = false;
  var jfired3 = false;
  var jfired4 = false;


  if (reqoneWeek){
    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate()+7);
    var date = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 12,0,0);
    var j = schedule.scheduleJob(date, function(){
        if(jfired1s === false){
          console.log('now inside j delayedemail scheduler');
          var email     = require("emailjs");
          var server    = email.server.connect({
           user:    requser,
           password:reqpassword,
           host:    "smtp.gmail.com",
           port:    465,
           ssl:     true
         });

          const attachmentArray = reqattachments.map((attachment) => {
              var filetype = attachment.slice(-3);
              if (filetype === "pdf") {
                filetype = "application/pdf";
              } else {
                filetype = "image/"+filetype;
              }

              return {
                  path: __dirname+"/uploads/"+attachment,
                  type: filetype,
                  name: attachment
              }
          })

          server.send({
             text:    reqtext,
             from:    requser,
             to:      reqreceiver,
             subject: reqsubject,
             cc: requser,
             attachment: attachmentArray
          }, function(err, message) {
            // if (err) res.send('error from sending email');
            //  res.send('email sent successfully');
             jfired1 = true;
           });
         }
      });

  }

  if (reqtwoWeek){

    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate()+14);
    var date = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 12,0,0);
    var j = schedule.scheduleJob(date, function(){
        if(jfired2 === false){
          console.log('now inside j delayedemail scheduler');
          var email     = require("emailjs");
          var server    = email.server.connect({
           user:    requser,
           password:reqpassword,
           host:    "smtp.gmail.com",
           port:    465,
           ssl:     true
         });

          const attachmentArray = reqattachments.map((attachment) => {
              var filetype = attachment.slice(-3);
              if (filetype === "pdf") {
                filetype = "application/pdf";
              } else {
                filetype = "image/"+filetype;
              }

              return {
                  path: __dirname+"/uploads/"+attachment,
                  type: filetype,
                  name: attachment
              }
          })

          server.send({
             text:    reqtext,
             from:    requser,
             to:      reqreceiver,
             subject: reqsubject,
             cc: requser,
             attachment: attachmentArray
          }, function(err, message) {
            // if (err) res.send('error from sending email');
            //  res.send('email sent successfully');
             jfired2 = true;
           });
         }
      });

  }


  if (reqthreeWeek){

    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate()+21);
    var date = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 12,0,0);
    var j = schedule.scheduleJob(date, function(){
        if(jfired3 === false){
          console.log('now inside j delayedemail scheduler');
          var email     = require("emailjs");
          var server    = email.server.connect({
           user:    requser,
           password:reqpassword,
           host:    "smtp.gmail.com",
           port:    465,
           ssl:     true
         });

          const attachmentArray = reqattachments.map((attachment) => {
              var filetype = attachment.slice(-3);
              if (filetype === "pdf") {
                filetype = "application/pdf";
              } else {
                filetype = "image/"+filetype;
              }

              return {
                  path: __dirname+"/uploads/"+attachment,
                  type: filetype,
                  name: attachment
              }
          })

          server.send({
             text:    reqtext,
             from:    requser,
             to:      reqreceiver,
             subject: reqsubject,
             cc: requser,
             attachment: attachmentArray
          }, function(err, message) {
            // if (err) res.send('error from sending email');
            //  res.send('email sent successfully');
             jfired3 = true;
           });
         }
      });

  }


  if (reqfourWeek){

    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate()+28);
    var date = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 12,0,0);
    var j = schedule.scheduleJob(date, function(){
        if(jfired4 === false){
          console.log('now inside j delayedemail scheduler');
          var email     = require("emailjs");
          var server    = email.server.connect({
           user:    requser,
           password:reqpassword,
           host:    "smtp.gmail.com",
           port:    465,
           ssl:     true
         });

          const attachmentArray = reqattachments.map((attachment) => {
              var filetype = attachment.slice(-3);
              if (filetype === "pdf") {
                filetype = "application/pdf";
              } else {
                filetype = "image/"+filetype;
              }

              return {
                  path: __dirname+"/uploads/"+attachment,
                  type: filetype,
                  name: attachment
              }
          })

          server.send({
             text:    reqtext,
             from:    requser,
             to:      reqreceiver,
             subject: reqsubject,
             cc: requser,
             attachment: attachmentArray
          }, function(err, message) {
            // if (err) res.send('error from sending email');
            //  res.send('email sent successfully');
             jfired4 = true;
           });
         }
      });
  }

  res.send('after if conditions in delayedemail');


})





router.post('/retrievetemplates', function(req,res,next){

  Templates.find({}, function(err,posts){
    res.json(posts);
  });

});


router.delete('/deleteItem/:delete_id',function(req,res,next){
  console.log("inside delete method");

  Templates.remove({
           _id: req.params.delete_id
       }, function(err, template) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted',
                      post: template});
       });

  });




module.exports = router;
