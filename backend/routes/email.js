var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/sendemail', function(req, res, next) {

  var email 	= require("emailjs");
  var server 	= email.server.connect({
   user:    req.body.username,
   password:req.body.password,
   host:    "smtp.gmail.com",
   port:    465,
   ssl:     true
 });

 console.log('inside sendemail and req.body.text is ', req.body.text);
 console.log('inside sendemail and req.body.username is ', req.body.username);
 console.log('inside sendemail and req.body.receiver is ', req.body.receiver);
 console.log('inside sendemail and req.body.subject is ', req.body.subject);
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    req.body.text,
     from:    req.body.username,
     to:      req.body.receiver,
     subject: req.body.subject,
     cc: req.body.username
  }, function(err, message) { console.log(err || message); });

});

module.exports = router;
