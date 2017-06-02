

import React, { Component } from 'react';
import axios from 'axios';
import renderIf from 'render-if';
import ListTemplate from './ListTemplate';

class SendMail extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      text: "",
      subject: "",
      receiver: "",
      templateBody: "",
      templateType: "",
      templateCompany: "",
      TemplateAddressee: "",
      TemplateEmailAddress: "",
      templateResults: [],
      toggleMakeTemplate: false,
      dummySavedJob: {},
      uploadList: [],
      optionState: "please pick a file",
      attachList:[],
      attachListcomma: ''
    }
    var self = this;
  }

  // savedJobtoEmail
  // body: { type: String, required: false },
  // type: { type: String, required: false },
  // company: { type: String, required: false },
  // addressee: { type: String, required: false },
  // emailAddress:  { type: String, required: false }

  componentWillMount() {
    console.log('inside componentWillMount of SendMail and the value of this.props.savedJobtoEmail is ', this.props.savedJobtoEmail);


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

  sendMyEmail(e){
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    var text = this.state.text;
    var subject = this.state.subject;
    var receiver = this.state.receiver;
    var attachList = this.state.attachList;
    this.setState({
      username: "",
      password: "",
      text: "",
      subject: "",
      receiver: "",
      attachList:[]
    })
      axios.post('http://localhost:5000/email/sendemail',{
        username: username,
        password: password,
        text: text,
        subject: subject,
        receiver: receiver,
        attachments: attachList
      })
      .then((response)=>{
        console.log("response from sending email ", response);
      })
  }

  createTemplate(e){
    e.preventDefault(e);
    var self = this;
    axios.post('http://localhost:5000/email/addtemplate',{
      body: this.state.templateBody,
    })
    .then((response)=>{
      // console.log("response from sending email ", response);
      self.retrieveTemplates(e);
    })
  }

  sendTemplatetoEmailFormJob(templateText, jobObj){
    console.log('inside sendTemplatetoEmailFormJob');
    var modifiedText = templateText.split("%%company%%").join(jobObj.companyName).split('%%job%%').join(jobObj.jobTitle);
    var self = this;
    self.setState({
      text: modifiedText
    })
  }

  sendTemplatetoEmailForm(templateText){
    console.log('inside sendTemplatetoEmailForm');
    var self = this;
    self.setState({
      text: templateText
    })
  }



  deleteTemplate(template){
    var self = this;
    var url = 'http://localhost:5000/email/deleteItem/' + template._id;

    axios.delete(url)
      .then((response)=>{
        console.log('delete list item response is ', response);
        self.retrieveTemplatesNoE();
      })
      .catch(function(error){
        console.error(error);
      })


  }



  retrieveTemplatesNoE(){

    var self = this;
      axios.post('http://localhost:5000/email/retrievetemplates')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((template)=>{
              tempObj = {};
              tempObj.body = template.body;
              tempObj._id = template._id;
              arryAll.push(tempObj);
            });
            self.setState({
              templateResults: arryAll
            });
          });
     this.forceUpdate();

  }






  retrieveTemplates(e){
    e.preventDefault();

    var self = this;
      axios.post('http://localhost:5000/email/retrievetemplates')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((template)=>{
              tempObj = {};
              tempObj.body = template.body;
              tempObj._id = template._id;
              arryAll.push(tempObj);
            });
            self.setState({
              templateResults: arryAll
            });
          });
     this.forceUpdate();

  }

  attachFile(e){
    e.preventDefault();
    var self = this;
    if (self.state.optionState!="please select a file"){
      const attachList = self.state.attachList.concat(self.state.optionState);
      self.setState({attachList},()=>{
        console.log('value of attachList after setting ', this.state.attachList);
        const attachListcomma = this.state.attachList.join(', ')
        self.setState({attachListcomma});
      });
    }





  }


  toggleTemplateMaker(e){
    e.preventDefault();

    var self = this;

    if(self.state.toggleMakeTemplate===false){
      self.setState({
        toggleMakeTemplate: true
      })
    }

    if(self.state.toggleMakeTemplate===true){
      self.setState({
        toggleMakeTemplate: false
      })
    }
  }

  // handleSelectUpload(e){
  //   e.preventDefault();
  //   console.log('inside handleSelectUpload');
  //   this.setState({
  //     optionState:e.target.value
  //   }, ()=>{
  //     console.log("value of e.target.value in handleSelectUpload is ", e.target.value);
  //     console.log("value of optionState after setting in handleSelectUpload is ", this.state.optionState);
  //   })
  // }
  //


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





      let listTemplates;

      if(this.state.templateResults.length!=0){
            listTemplates = this.state.templateResults.map((template,i) => {
              if (this.props.savedJobtoEmail.hasOwnProperty("jobTitle")){
                console.log('inside hasOwnProperty jobTitle SENDMAIL')
                return (
                  <ListTemplate key={i} template={template} sendTemplatetoEmailFormJob={this.sendTemplatetoEmailFormJob.bind(this)}
                  savedJobtoEmail={this.props.savedJobtoEmail}
                  deleteTemplate={this.deleteTemplate.bind(this)}/>
                );
              }else{
                console.log('inside DOES NOT hasOwnProperty jobTitle SENDMAIL')
                return (
                  <ListTemplate key={i} template={template} sendTemplatetoEmailForm={this.sendTemplatetoEmailForm.bind(this)}
                  savedJobtoEmail={this.state.dummySavedJob}
                  deleteTemplate={this.deleteTemplate.bind(this)}/>
                );
              }
            });
      }
      if(this.state.templateResults.length===0){
        listTemplates = <div><p> Search for templates to populate! If there are none, add some! </p></div>
      }

          return (
            <div>
              <h1>Send Mail!</h1>

              <form>
                <input
                        onChange={(e)=>this.setState({username: e.target.value })}
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.username}
                        placeholder="username"/>
                <input
                        onChange={(e)=>this.setState({password: e.target.value })}
                        type="text"
                        name="password"
                        id="password"
                        value={this.state.password}
                        placeholder="password"/>
                <input
                        onChange={(e)=>this.setState({receiver: e.target.value })}
                        type="text"
                        name="receiver"
                        id="receiver"
                        value={this.state.receiver}
                        placeholder="receiver"/>
                <input
                        onChange={(e)=>this.setState({subject: e.target.value })}
                        type="text"
                        name="subject"
                        id="subject"
                        value={this.state.subject}
                        placeholder="subject"/>
                <textarea rows="4" cols="50"
                        onChange={(e)=>this.setState({text: e.target.value })}
                        name="text"
                        id="text"
                        value={this.state.text}
                        placeholder="text"
                ></textarea>
                <select
                onChange={(e)=>this.setState({optionState:e.target.value})}>
                  {option}
                </select>
                <button onClick={(e)=>this.attachFile(e)}>Attach File!</button>
                <button onClick={(e)=>this.sendMyEmail(e)}>Send Email!</button>
              </form>



              {renderIf(this.state.attachList.length===0)(
                <div>
                  <p>You have no files attached!</p>
                </div>
              )}
              {renderIf(this.state.attachList.length!=0)(
                <div>
                  <p>You have attached these files:</p>{this.state.attachListcomma}
                </div>
              )}



              <br/>
              {renderIf(this.state.toggleMakeTemplate)(
                <div className='templateMakerDiv toggleTemplate'>
                  <h1>Make New Mail Template!</h1>

                  <form className="templateMakerForm">
                    <textarea rows="10" cols="100"
                            onChange={(e)=>this.setState({templateBody: e.target.value })}
                            name="text"
                            id="text"
                            value={this.state.templateBody}
                            placeholder="text"
                    ></textarea>
                    <button onClick={(e)=>this.createTemplate(e)}>create this template!</button>
                    <button onClick={(e)=>this.sendTemplatetoEmailForm(e)}>send this template to email form!</button>
                  </form>

                    <button onClick={(e)=>this.toggleTemplateMaker(e)}>Hide Template Maker!</button>
                </div>
              )}

              {renderIf(this.state.toggleMakeTemplate===false)(
                  <button className="toggleTemplate" onClick={(e)=>this.toggleTemplateMaker(e)}>Show Template Maker!</button>
              )}


              <br/>
              <button onClick={(e)=>this.retrieveTemplates(e)}>retrieve saved templates!</button>




              <br/>
              <div className='savedJobsList jobListing jobsList'>
                {listTemplates}
              </div>

              <br/>

              {renderIf(this.props.savedJobtoEmail.hasOwnProperty("jobTitle"))(
                <div className='savedJobsList jobListing jobsList'>
                  <h2>This saved Job was sent to email!</h2>
                  <h3><strong>{this.props.savedJobtoEmail.jobTitle}</strong></h3>
                  <h4>{this.props.savedJobtoEmail.jobLink}</h4>
                  <h4>{this.props.savedJobtoEmail.companyName}</h4>
                  <h4>{this.props.savedJobtoEmail.jobLocation}</h4>
                  <h4>{this.props.savedJobtoEmail.jobDescription}</h4>
                  <h3>job status: {this.props.savedJobtoEmail.jobStatus}</h3>
                </div>
              )}


            </div>
          );
        }
}

export default SendMail;
