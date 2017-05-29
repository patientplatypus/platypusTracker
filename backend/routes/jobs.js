var express = require('express');
var router = express.Router();
var Goals = require('../models/goalsSchema');
var Jobs = require('../models/jobsSchema');
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

router.post('/search', function(req,res,next){

  //https://www.indeed.com/jobs?q=programming&l=Austin
  //https://www.indeed.com/jobs?as_and=programming&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l=Austin%2C+TX&fromage=any&limit=50&sort=&psf=advsrch

  // var url = "https://www.indeed.com/jobs?q="+req.body.searchTerm+"&l="+req.body.searchCity;
  var returnArray = [];
  var url = "https://www.indeed.com/jobs?as_and="+req.body.searchTerm+"&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l="+req.body.searchCity+
     '&fromage=15&limit=20&sort=&psf=advsrch';
  var promise = new Promise(function(resolve){
    request(url, function(err, resp, html) {
          if (!err){
            $ = cheerio.load(html);

            // var jobArray = [];
            var organicJobs = $('[data-tn-component=organicJob]');
            var counter = 0;

            organicJobs.each(function(i, elem) {
              var tempObj = {};

              var jobTitle = $(this).children().eq(0).text().split('\n').join('');

              tempObj.jobTitle = jobTitle;
              var alink = $(this).children().eq(0).html();
              var alinksplit = alink.split(" ");
              var alinkmodified = alinksplit[2];
              var alinkfinal = 'http://www.indeed.com'+alinkmodified.slice(6, -1);
              var alinklength = alinkmodified.length;
              tempObj.jobLink = alinkfinal;
              //split(search).join(replacement);
              var companyName = $(this).children().eq(1).text().split('\n').join('').split('  ').join('');
              tempObj.companyName = companyName;
              var location = $(this).children().eq(3).text().split('\n').join('');
              tempObj.jobLocation = location;
              var description = $(this).children().eq(4).text().split('\n').join('');
              tempObj.jobDescription = description;
              // tempObj.parent = $(this).parent().children().text();
              // jobArray[i] = tempObj;

              returnArray[i] = tempObj;
              if (i===organicJobs.length-1){
                  resolve(true);
              }
              counter = i;
            });

            var jobTitlehref = $('[data-tn-element=jobTitle]').attr('href');
            console.log(returnArray);
            console.log('counter ', counter);
            console.log('organicJobs.length ', organicJobs.length);
        }
    });
  });

  promise.then(function(resolve){
    if (resolve){
      res.json({returnedJobs: returnArray});
    }
  });

});


// jobTitle: { type: String, required: false },
// jobLink: { type: String, required: false },
// companyName: { type: String, required: false },
// jobLocation: { type: String, required: false },
// jobDescription: { type: String, required: false }

router.post('/addjob', function(req,res,next){

  var job = new Jobs({
    jobTitle: req.body.jobTitle,
    jobLink: req.body.jobLink,
    companyName: req.body.companyName,
    jobLocation: req.body.jobLocation,
    jobDescription: req.body.jobDescription
  })

  job.save(function(err,post){
    if (err) {return next(err)}
    res.json(200, post)
  })

})



router.post('/alljobinfo', function(req,res,next){
  Jobs.find({}, function(err,posts){
    res.json(posts);
  });
});








module.exports = router;
