var express = require('express');
var router = express.Router();
var Goals = require('../models/goalsSchema');
var Jobs = require('../models/jobsSchema');
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');


router.post('/search', function(req, res, next) {
  //762b4935577174c44e2c204f1a3322
  // https://api.meetup.com/2/events?key=ABDE12456AB2324445&group_urlname=ny-tech&sign=true
  // https://api.meetup.com/find/events?text="javascript code"&&sign=true

  var url = 'https://api.meetup.com/find/events?key=762b4935577174c44e2c204f1a3322&text="'+req.body.searchTerm+'"&&sign=true';
  var returnresponse;
    axios.get(url)
      .then((response)=>{
        console.log("this is the response from meetup ", response.data);
        // var parseresponse = json.parse(response)
        // res.send(parseresponse);
        res.send(response.data);
      })
});




module.exports = router;
