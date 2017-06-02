var express = require('express');
var formidable = require('formidable');
var fs = require( 'fs' );
var path = require( 'path' );
var PDFImage = require("pdf-image").PDFImage;
var router = express.Router();



var app = express();

router.get('/getall', function (req, res){
    // res.sendFile(__dirname + '/uploads');

    var returnArray = [];

    var promise = new Promise((resolve)=>{
      fs.readdir( __dirname + '/uploads', function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        }
        files.forEach( function( file, index ) {
          console.log("this is the file from the getall files ", file);
          if (!file.includes('-0.png')){
            returnArray.push(file)
          }
          if (index===files.length-1){
            resolve(true)
          }
        })
      })
    })

    promise.then((resolve)=>{
      if(resolve){
        console.log('right before res.send in getall and returnArray is ', returnArray)
        res.send(returnArray);
      }
    })


});

router.get('/getsinglefile/:name', function(req,res){
  console.log('inside getsinglefile');
  if(req.params.name.includes('.pdf')){
    console.log('inside pdf tag');
    var pdfImage = new PDFImage(__dirname+'/uploads/'+req.params.name);
    pdfImage.convertPage(0).then(function (imagePath) {
       console.log('this is the imagePath', imagePath);
       res.sendFile(imagePath);
     }, function (err) {
       res.send(err, 500);
     });
  }else{
    res.sendFile(__dirname+'/uploads/'+req.params.name);
  }
})


// app.get(/(.*\.pdf)\/([0-9]+).png$/i, function (req, res) {
//   var pdfPath = req.params[0];
//   var pageNumber = req.params[1];
//
//   var PDFImage = require("pdf-image").PDFImage;
//   var pdfImage = new PDFImage(pdfPath);
//
//   pdfImage.convertPage(pageNumber).then(function (imagePath) {
//     res.sendFile(imagePath);
//   }, function (err) {
//     res.send(err, 500);
//   });
// });

router.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    console.log('inside upload');
    console.log('inside upload and the value of req.body.data is ', req.body.data);
    console.log('inside upload and req.body is ', req.body);

    // console.log("this is the req from the formData object I send ", req);

    form.parse(req);

    console.log('after form parse');


    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);


        var returnArray = [];

        var promise = new Promise((resolve)=>{
          fs.readdir( __dirname + '/uploads', function( err, files ) {
            if( err ) {
                console.error( "Could not list the directory.", err );
                process.exit( 1 );
            }
            files.forEach( function( file, index ) {
              console.log("this is the file from the getall files ", file);
              if (!file.includes('-0.png')){
                returnArray.push(file)
              }
              if (index===files.length-1){
                resolve(true)
              }
            })
          })
        })

        promise.then((resolve)=>{
          if(resolve){
            console.log('right before res.send in getall and returnArray is ', returnArray)
            res.send(returnArray);
          }
        })



    });

    // res.sendFile(__dirname + '/index.html');
});


// router.post('/addcontact', function(req,res,next){
//
//   var contact = new Contacts({
//     linkedIn: req.body.linkedIn,
//     name: req.body.name,
//     profilePic: req.body.profilePic,
//     email: req.body.email,
//     phone: req.body.phone,
//     github: req.body.github,
//     notes: req.body.notes
//   });
//
//   contact.save(function(err,post){
//     if (err) {return next(err)}
//     res.json(200, post)
//   });
//
// });
//
//
// router.post('/allcontactinfo', function(req,res,next){
//   Contacts.find({}, function(err,posts){
//     res.json(posts);
//   });
// });


module.exports = router;
