

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
      imgFromFile: null
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

  updateUploads(){
    var self = this;

      axios.get('http://localhost:5000/upload/getall')
        .then((response)=>{
          const uploadList = self.state.uploadList.concat(response.data);
          self.setState({uploadList});
        })
      this.forceUpdate();
  }

  onDrop(files){
    var file = new FormData();
    file.append('name',files[0])
    var req=request
              .post('http://localhost:5000/upload/')
              .send(file);
    req.end(function(err,response){
        console.log("upload done!!!!!");
        this.updateUploads();
    });
  }

   retrieveFile(e){
     e.preventDefault();
     axios.post('http://localhost:5000/upload/getsinglefile',{
       name: this.state.optionState
     })
       .then((response)=>{
         console.log('value from retrieveFile return ', response);
         this.setState({
           imgFromFile: response.data
         },()=>{
           console.log('after setting state and imgFromFile is ', this.state.imgFromFile);
         })
       })
   }

// <input type="select" label="Multiple Select" multiple>
//   {this.createSelectItems()}
// </input>


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
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>

        <form>
          <select onChange={(e)=>this.setState({optionState:e.target.value})}>
            {option}
          </select>
          <button onClick={(e)=>this.retrieveFile(e)}>Retrieve File!</button>
        </form>

        {renderIf(this.state.imgFromFile === null)(
          <div>
            <p>choose a file to show a preview!</p>
          </div>
        )}
        {renderIf(this.state.imgFromFile != null)(
          <div>
            <p>before picture</p>
            <img src={this.state.imgFromFile}></img>
            <p>after picture</p>
          </div>
        )}

      </div>
      );
    }
}

export default UploadFiles;
