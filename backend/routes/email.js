var express = require('express');
var router = express.Router();
var Templates = require('../models/templatesSchema');
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
 }, function(err, message) { console.log(err || message); });

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
