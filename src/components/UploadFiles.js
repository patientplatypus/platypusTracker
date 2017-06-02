

import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import renderIf from 'render-if';

// <!DOCTYPE html>
// <html>
// <head>
//     <title>Simple Upload Example</title>
// </head>
// <body>
// <form action="/" enctype="multipart/form-data" method="post">
//     <input type="file" name="upload" multiple>
//     <input type="submit" value="Upload">
// </form>
// </body>
// </html>

// <form enctype="multipart/form-data">
//   <input
//           onChange={(e)=>this.setState({username: e.target.value })}
//           type="file"
//           name="upload"
//           id="upload"
//           multiple
//           placeholder="upload"/>
//   <button onClick={(e)=>this.sendMyEmail(e)}>Upload File!</button>
// </form>

class UploadFiles extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploadList: [],
      optionState: "please pick a file",
      imgFromFile: false
    }
    var self = this;
  }






  componentDidMount() {
    var self = this;

      axios.get('http://localhost:5000/upload/getall')
        .then((response)=>{
          console.log('back from upload/getall', response.data);
          const uploadList = self.state.uploadList.concat(response.data);
          self.setState({uploadList});

        })
  }

  // updateUploads(){
  //   var self = this;
  //   axios.get('http://localhost:5000/upload/getall')
  //     .then((response)=>{
  //       const uploadList = self.state.uploadList.concat(response.data);
  //       self.setState({uploadList});
  //     })
  //
  //       debugger;
  //     this.forceUpdate();
  //     debugger;
  // }



  onDrop(files){
    var self = this;
    var file = new FormData();
    console.log('this.state.uploadList in onDrop before everything else ', this.state.uploadList);
    file.append('name',files[0]);
    var req=request
              .post('http://localhost:5000/upload/')
              .send(file);
    req.end((err,response)=>{
        console.log("upload done!!!!!");
        console.log('value of response from onDrop is ', response.body);
        console.log('value of self.state in onDrop is ', this.state.uploadList);
        const uploadList = (response.body);
        self.setState({uploadList});
    });
  }

   retrieveFile(e){
     var self = this;
     e.preventDefault();


      self.setState({
           imgFromFile: true
         },()=>{
           var canvas = document.getElementById("mainCanvas");
           var ctx = canvas.getContext("2d");
           var img = new Image();
           img.onload = function () {
             ctx.clearRect(0, 0, 200, 200);
             ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                 0, 0, canvas.width, canvas.height); // destination rectangle
           }
           img.src="http://localhost:5000/upload/getsinglefile/"+this.state.optionState;
     })
  }

// <input type="select" label="Multiple Select" multiple>
//   {this.createSelectItems()}
// </input>
  // <img src={this.state.imgFromFile}></img>


  render() {

    let option = [];
    option.push(<option key={0} value="please select">please select a file</option>)
    var key = 1;
    console.log('this.state.uploadList in render ', this.state.uploadList);
    this.state.uploadList.map(item => {
        option.push(<option key={key} value={item}>{item}</option>)
        key++;
      }
    );
    console.log('value of options after map ', option);


    return (
      <div>
        <div className="dropZone">
          <div className='dropZoneinner'>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>

        <form>
          <select onChange={(e)=>this.setState({optionState:e.target.value})}>
            {option}
          </select>
          <button onClick={(e)=>this.retrieveFile(e)}>Preview File!</button>
        </form>

        {renderIf(this.state.imgFromFile === false)(
          <div>
            <p>choose a file to show a preview!</p>
          </div>
        )}
        {renderIf(this.state.imgFromFile === true)(
          <div>
            <canvas id="mainCanvas" width="auto" height="300"></canvas>
          </div>
        )}

      </div>
      );
    }
}

export default UploadFiles;
