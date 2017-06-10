

import React, { Component } from 'react';
import axios from 'axios';
import renderIf from 'render-if';
import ListTemplate from './ListTemplate';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from './Button';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Dialog from 'material-ui/Dialog';


// <Checkbox
//   label="Simple"
//   style={styles.checkbox}
// />

const styles = {
  base: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
    marginLeft: "10px"
    //not totally sure how to change colors SADPANDA
    // backgroundColor: '#F3C677',
    // labelColor: '#7B1E7A'
  },
  textInput: {
    marginRight: '10px',
    color: "#F3C677",
    // #F3C677
  },
  textInputInput: {
    color: "#F3C677",
    // #F3C677
  },
  textInput2:{
    marginRight: '10px',
    marginLeft: "10px",
    color: "#7A4E79",
    width: "90%"
  },
  textInputInput2:{
    color: "#7A4E79",
    padding:"10px",
    width: "90%"
  },
  h4:{
    color: "#7A4E79",
  },
  paper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2CC8A',
    display: 'inline-block',
  },
  orangepaper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2A521',
    display: 'inline-block',
  },
  dropzone: {
    backgroundColor: '#F2A521',
    height: "400px",
    width: "400px",
    borderStyle: "dashed",
    borderColor: "black",
    marginTop: '5px',
    borderWidth: "10px"
  },
  purplepaper:{
    height: "auto",
    width: "60%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
  },
  purplepaper2:{
      height: "auto",
      width: "60%",
      paddingLeft: "130px",
      paddingRight: "5px",
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px',
      backgroundColor: '#7A5079',
      display: 'inline-block',
    },
  select:{
    width: "78.5%",
    verticalAlign: "bottom",
    float: "left"
  },
  checkbox:{
    width:"200px",
    height:"auto",
    fontSize:"15px",
    fontWeight:"bold",
    display:"inline-block",
    float:'left'
  },
  showhide: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
    width: '50%'
  },
  loadingContainer:{
    backgroundColor: "#F3C677",
    fontWeight: "bold",
    width:"20%",
    height: "auto",
    color:  "#7B1E7A",
    margin: "0 auto",
    borderRadius: "10px",
    padding: "10px"
  },
  imgFromFile:{
    postion:'absolute',
    width:'auto',
    height:'300',
    textAlign: 'center'
  }
};

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
      attachListcomma: '',
      savedJobtoEmail: {},
      savedContacttoEmail: {},
      oneWeek: false,
      twoWeek: false,
      threeWeek: false,
      fourWeek: false,
      templatesRetrieved: false,
      removeContact:false,
      values: [],
      imgFromFile: false
    }
    var self = this;
  }

  componentWillMount() {

    var self = this;

      axios.get('http://localhost:5000/upload/getall')
        .then((response)=>{
          console.log('back from upload/getall', response.data);
          const uploadList = self.state.uploadList.concat(response.data);
          self.setState({uploadList});
        })



        if(this.props.savedJobtoEmail.hasOwnProperty('jobTitle') && this.props.updatedJob===true){

          self.setState({
             savedJobtoEmail: this.props.savedJobtoEmail,
             savedContacttoEmail:{},

           })
        }
        if(this.props.savedContacttoEmail.hasOwnProperty('name') && this.props.updatedEmail===true){

          self.setState({
            savedJobtoEmail: {},
            savedContacttoEmail:this.props.savedContacttoEmail,
            text:'Dear '+ this.props.savedContacttoEmail.name + ', ',
            receiver:this.props.savedContacttoEmail.email,
            updatedJob: false,
            removeContact: false,
            updatedEmail: true
          })
        }


  }


  forceUpdateUploads(e){
    e.preventDefault();
    var self = this;
    this.setState({
      openDropBox:false
    })

      axios.get('http://localhost:5000/upload/getall')
        .then((response)=>{
          console.log('back from upload/getall', response.data);
          const uploadList = self.state.uploadList.concat(response.data);
          self.setState({uploadList});
        })

    this.forceUpdate();
  }



  sendMyEmail(e){
    e.preventDefault();
    var self = this;
    var username = this.state.username;
    var password = this.state.password;
    var text = this.state.text;
    var subject = this.state.subject;
    var receiver = this.state.receiver;
    var attachList = this.state.attachList;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var today = mm+'/'+dd+'/'+yyyy;

    var emailname = "to: " + receiver + " subject: " + subject;



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
        console.log('inside the after sendemail axios post in sendmail');

        axios.post('http://localhost:5000/calendar/addgoal',{
          name: emailname,
          dateDue: today,
          actionType: '***email***',
          notes: text
        })
          .then((response)=>{
            console.log("result from calendarAdd axios post IN EMAIL is ", response)
          })
          .catch(function(error){
            console.error(error);
          });
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
              templateResults: arryAll,
              templatesRetrieved: true
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
              templateResults: arryAll,
              templatesRetrieved: true
            });
          });
     this.forceUpdate();

  }

  attachFile(e){
    e.preventDefault();
    var self = this;
    if (self.state.values!="please select a file"){
      const attachList = self.state.attachList.concat(self.state.values);
      self.setState({
        values: []
      })
      self.setState({attachList},()=>{
        console.log('value of attachList after setting ', this.state.attachList);
        const attachListcomma = this.state.attachList.join(', ')
        self.setState({attachListcomma});
      });
    }





  }


  removeSavedJob(e){
    e.preventDefault();
    this.setState({
      savedJobtoEmail: {}
    })
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

  toggleRetrievedTemplates(e){
    e.preventDefault();

    var self = this;

    if(self.state.templatesRetrieved===false){
      self.setState({
        templatesRetrieved: true
      })
    }

    if(self.state.templatesRetrieved===true){
      self.setState({
        templatesRetrieved: false
      })
    }
  }



  delayedEmail(e){
    e.preventDefault();
    var self = this;


    var self = this;
    var username = this.state.username;
    var password = this.state.password;
    var text = this.state.text;
    var subject = this.state.subject;
    var receiver = this.state.receiver;
    var attachList = this.state.attachList;
    var oneWeek = this.state.oneWeek;
    var twoWeek = this.state.twoWeek;
    var threeWeek = this.state.threeWeek;
    var fourWeek = this.state.fourWeek;

    var emailname = "to: " + receiver + " subject: " + subject;

    var oneWeekaheadDate = new Date();
    var twoWeekaheadDate = new Date();
    var threeWeekaheadDate = new Date();
    var threeWeekaheadDate = new Date();

    if (oneWeek){
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      var dd = targetDate.getDate();
      var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      var yyyy = targetDate.getFullYear();
      var dateString = mm + "/" + dd + "/" + yyyy;
      var oneWeekaheadDate = dateString;
    }

    if (twoWeek){
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 14);
      var dd = targetDate.getDate();
      var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      var yyyy = targetDate.getFullYear();
      var dateString = mm + "/" + dd + "/" + yyyy;
      var twoWeekaheadDate = dateString;
    }

    if (threeWeek){
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 21);
      var dd = targetDate.getDate();
      var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      var yyyy = targetDate.getFullYear();
      var dateString = mm + "/" + dd + "/" + yyyy;
      var threeWeekaheadDate = dateString;
    }

    if (fourWeek){
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 28);
      var dd = targetDate.getDate();
      var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      var yyyy = targetDate.getFullYear();
      var dateString = mm + "/" + dd + "/" + yyyy;
      var fourWeekaheadDate = dateString;
    }


    this.setState({
      username: "",
      password: "",
      text: "",
      subject: "",
      receiver: "",
      attachList:[],
      oneWeek: false,
      twoWeek: false,
      threeWeek: false,
      fourWeek: false
    })
      axios.post('http://localhost:5000/email/delayedemail',{
        username: username,
        password: password,
        text: text,
        subject: subject,
        receiver: receiver,
        attachments: attachList,
        oneWeek: oneWeek,
        twoWeek: twoWeek,
        threeWeek: threeWeek,
        fourWeek: fourWeek,
        oneWeekaheadDate: oneWeekaheadDate,
        twoWeekaheadDate: twoWeekaheadDate,
        threeWeekaheadDate: threeWeekaheadDate,
        fourWeekaheadDate: fourWeekaheadDate,
      })
      .then((response)=>{
        console.log('inside the after delayedemail axios post in sendmail');


        if (oneWeek){
          axios.post('http://localhost:5000/calendar/addgoal',{
            name: emailname,
            dateDue: oneWeekaheadDate,
            actionType: '***email***',
            notes: text
          })
            .then((response)=>{
              console.log("result from calendarAdd axios post IN EMAIL is ", response)
            })
            .catch(function(error){
              console.error(error);
            });
        }

        if (twoWeek){
          axios.post('http://localhost:5000/calendar/addgoal',{
            name: emailname,
            dateDue: twoWeekaheadDate,
            actionType: '***email***',
            notes: text
          })
            .then((response)=>{
              console.log("result from calendarAdd axios post IN EMAIL is ", response)
            })
            .catch(function(error){
              console.error(error);
            });
        }

        if (threeWeek){
          axios.post('http://localhost:5000/calendar/addgoal',{
            name: emailname,
            dateDue: threeWeekaheadDate,
            actionType: '***email***',
            notes: text
          })
            .then((response)=>{
              console.log("result from calendarAdd axios post IN EMAIL is ", response)
            })
            .catch(function(error){
              console.error(error);
            });
        }


        if (fourWeek){
          axios.post('http://localhost:5000/calendar/addgoal',{
            name: emailname,
            dateDue: fourWeekaheadDate,
            actionType: '***email***',
            notes: text
          })
            .then((response)=>{
              console.log("result from calendarAdd axios post IN EMAIL is ", response)
            })
            .catch(function(error){
              console.error(error);
            });
        }




      });
  }


  handleOptionState(e){
    e.preventDefault();
    console.log('inside handleOptionState');
    console.log('right before setting optionState and its value is ', this.state.optionState);
    this.setState({
      optionState: e.target.value
    },()=>{
      console.log('after setting optionState and the value of optionstate is ', this.state.optionState);
    })
  }

  menuItems(menuValues) {
    return this.state.uploadList.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={menuValues && menuValues.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  menuItems(values) {
  return this.state.uploadList.map((name) => (
    <MenuItem
      key={name}
      insetChildren={true}
      checked={values && values.indexOf(name) > -1}
      value={name}
      primaryText={name}
    />
  ));
}

  onDrop(files){
    var self = this;
    var file = new FormData();
    file.append('name',files[0]);
    // console.log('the value of files[0] is ', files[0].name);
    var req=request
              .post('http://localhost:5000/upload/')
              .send(file);
    req.end((err,response)=>{
        console.log("upload done!!!!!");
        console.log('value of response from onDrop is ', response.body);
        // retrieveFile(file);

        var self = this;
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
              img.src="http://localhost:5000/upload/getsinglefile/"+files[0].name;
              setTimeout(()=>{
                self.setState({
                  imgFromFile:false
                })
              },1500)
        })


    });
  }

 //  retrieveFile(file){
 //
 // }


 handleremoveJobandContact(e){
   e.preventDefault();
   this.props.removeJobandContact();
 }



 handleSelectChange = (event, index, values) => this.setState({values, attachList: []});

  render() {
    const {values} = this.state;
  // option.push(<option key={key} value={item}>{item}</option>)
  // option.push(<option key={0} value="please select">please select a file</option>)
  //  <MenuItem value={1} primaryText="Never" />
  // <select
  // onChange={(e)=>this.setState({optionState:e.target.value})}>
  //   {option}
  // </select>

//   menuItems(values) {
//   return names.map((name) => (
//     <MenuItem
//       key={name}
//       insetChildren={true}
//       checked={values && values.indexOf(name) > -1}
//       value={name}
//       primaryText={name}
//     />
//   ));
// }


    // let option = [];
    // option.push(<MenuItem value={"please select"} primaryText="please select a file"/>)
    // var key = 1;
    // console.log('this.state.uploadList in render ', this.state.uploadList);
    // this.state.uploadList.map(item => {
    //     option.push(<MenuItem value={item} primaryText={item}/>)
    //     key++;
    //   }
    // );
    // console.log('value of options after map ', option);





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
        // listTemplates = <div><p> Search for templates to populate! If there are none, add some! </p></div>
      }

          return (
            <div>

              <Paper style={styles.purplepaper} zDepth={2}>
                <TextField
                  hintText="username"
                  onChange={(e)=>this.setState({username: e.target.value })}
                  value={this.state.username}
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                />
                <TextField
                  hintText="password"
                  onChange={(e)=>this.setState({password: e.target.value })}
                  value={this.state.password}
                  type="password"
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                /><br/>
                <hr/>
                <TextField
                  hintText="receiver"
                  onChange={(e)=>this.setState({receiver: e.target.value })}
                  value={this.state.receiver}
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                />
                <TextField
                  hintText="subject"
                  onChange={(e)=>this.setState({subject: e.target.value })}
                  value={this.state.subject}
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                /><br/>
                <hr/>
                <TextField
                  floatingLabelText="email body"
                  onChange={(e)=>this.setState({text: e.target.value })}
                  value={this.state.text}
                  style={styles.textInput}
                  textareaStyle={styles.textInputInput}
                  multiLine={true}
                  fullWidth={true}
                  rows={5}
                  /><br/>
              </Paper>
              <br/>



              <Paper style={styles.purplepaper} zDepth={2}>
                <SelectField
                  multiple={true}
                  style={styles.select}
                  hintText="attach files"
                  value={values}
                  onChange={this.handleSelectChange}
                >
                  {this.menuItems(values)}
                </SelectField>

                <Button
                   label={'attach'}
                   style={styles.button}
                   onClick={(e)=>this.attachFile(e)}
                   secondary={true}
                 />
                 <Button
                    label={'upload'}
                    style={styles.button}
                    onClick={(e)=>this.setState({openDropBox: true})}
                    primary={true}
                  /><br/>

                 {renderIf(this.state.attachList.length===0)(
                   <div>
                     <p>You have no files attached!</p>
                   </div>
                 )}
                 {renderIf(this.state.attachList.length!=0)(
                   <div>
                     <p>You have attached these files: {this.state.attachListcomma} </p>
                   </div>
                 )}

               </Paper>
               <br/>



               <Paper style={styles.purplepaper2} zDepth={2}>
                 <Checkbox
                   label="Email in a Week"
                   style={styles.checkbox}
                   checked={this.state.oneWeek}
                   onCheck={()=>{
                     if(this.state.oneWeek===false){
                       this.setState({
                         oneWeek:true
                       })
                     }
                     if(this.state.oneWeek===true){
                       this.setState({
                         oneWeek:false
                       })
                     }
                   }}
                 />
                 <Checkbox
                   label="Email in 2 Weeks"
                   style={styles.checkbox}
                   checked={this.state.twoWeek}
                   onCheck={()=>{
                     if(this.state.twoWeek===false){
                       this.setState({
                         twoWeek:true
                       })
                     }
                     if(this.state.twoWeek===true){
                       this.setState({
                         twoWeek:false
                       })
                     }
                   }}
                 />
                 <Checkbox
                   label="Email in 3 Weeks"
                   style={styles.checkbox}
                   checked={this.state.threeWeek}
                   onCheck={()=>{
                     if(this.state.threeWeek===false){
                       this.setState({
                         threeWeek:true
                       })
                     }
                     if(this.state.threeWeek===true){
                       this.setState({
                         threeWeek:false
                       })
                     }
                   }}
                 />
                 <Checkbox
                   label="Email in 4 Weeks"
                   style={styles.checkbox}
                   checked={this.state.fourWeek}
                   onCheck={()=>{
                     if(this.state.fourWeek===false){
                       this.setState({
                         fourWeek:true
                       })
                     }
                     if(this.state.fourWeek===true){
                       this.setState({
                         fourWeek:false
                       })
                     }
                   }}
                 /><br/>


               </Paper>

               <Paper style={styles.purplepaper} zDepth={2}>
                   {renderIf(this.state.oneWeek||this.state.twoWeek||this.state.threeWeek||this.state.fourWeek)(
                     <Button
                        label={'send delayed email'}
                        style={styles.button}
                        onClick={(e)=>this.delayedEmail(e)}
                        secondary={true}
                      />
                  )}
                  {renderIf(!(this.state.oneWeek||this.state.twoWeek||this.state.threeWeek||this.state.fourWeek))(
                    <Button
                       label={'send email'}
                       style={styles.button}
                       onClick={(e)=>this.sendMyEmail(e)}
                       secondary={true}
                     />
                  )}
               </Paper>
              <br/>



              <Paper style={styles.orangepaper} zDepth={2}>
              {renderIf(this.state.toggleMakeTemplate===false)(
                <Button
                   label={'show template maker'}
                   style={styles.button}
                   onClick={(e)=>this.toggleTemplateMaker(e)}
                   primary={true}
                 />
              )}

              {renderIf(this.state.toggleMakeTemplate)(
                <div>
                  <h4 style={styles.h4}>Make New Mail Template!</h4>

                  <TextField
                    floatingLabelText="template body"
                    onChange={(e)=>this.setState({templateBody: e.target.value })}
                    value={this.state.templateBody}
                    style={styles.textInput2}
                    textareaStyle={styles.textInputInput2}
                    multiLine={true}
                    fullWidth={true}
                    rows={5}
                    /><br/>

                    <Button
                       label={'hide template maker'}
                       style={styles.button}
                       onClick={(e)=>this.toggleTemplateMaker(e)}
                       primary={true}
                     />
                    <Button
                       label={'create template'}
                       style={styles.button}
                       onClick={(e)=>this.createTemplate(e)}
                       secondary={true}
                     />
                </div>
              )}
              </Paper>
              <br/>

              <Paper style={styles.orangepaper} zDepth={2}>
                {renderIf(!this.state.templatesRetrieved)(
                  <Button
                     label={'show saved templates'}
                     style={styles.button}
                     onClick={(e)=>{
                       this.toggleRetrievedTemplates(e)
                       this.retrieveTemplates(e)
                     }}
                     primary={true}
                   />
                )}
                {renderIf(this.state.templatesRetrieved)(
                  <div>
                  <Button
                     label={'hide templates'}
                     style={styles.button}
                     onClick={(e)=>this.toggleRetrievedTemplates(e)}
                     primary={true}
                   />
                   <br/>
                     {listTemplates}
                   </div>
                )}
              </Paper>
              <br/>

              {renderIf(this.state.savedJobtoEmail.hasOwnProperty("jobTitle"))(
                 <Paper style={styles.orangepaper} zDepth={2}>
                  <h2>This saved Job was sent to email!</h2>
                  <h3><strong>{this.state.savedJobtoEmail.jobTitle}</strong></h3>
                  <h4>{this.state.savedJobtoEmail.jobLink}</h4>
                  <h4>{this.state.savedJobtoEmail.companyName}</h4>
                  <h4>{this.state.savedJobtoEmail.jobLocation}</h4>
                  <h4>{this.state.savedJobtoEmail.jobDescription}</h4>
                  <Button
                     label={'Remove job'}
                     style={styles.button}
                     onClick={(e)=>this.handleremoveJobandContact(e)}
                     primary={true}
                   />
                </Paper>
              )}

              {renderIf(this.state.savedContacttoEmail.hasOwnProperty("name"))(
                <Paper style={styles.orangepaper} zDepth={2}>
                  <h2>This Contact was sent to email!</h2>
                  <h3>Here are your notes on this guy :D</h3>
                  <h4>{this.state.savedContacttoEmail.notes}</h4>
                  <br/>
                  {renderIf(this.state.savedContacttoEmail.profilePic!='')(
                    <div>
                    <img src={this.state.savedContacttoEmail.profilePic}/>
                    <br/>
                    </div>
                  )}
                  <Button
                     label={'Remove contact'}
                     style={styles.button}
                     onClick={(e)=>this.handleremoveJobandContact(e)}
                     primary={true}
                   />
                </Paper>
              )}


              <Dialog
                 modal={true}
                 bodyStyle={{
                    padding: '0px',
                    paddingTop: '0px',
                    textAlign: 'center',
                    backgroundColor: '#7A5079'
                 }}
                 open={this.state.openDropBox}
               >
               <div>
               <div className="dropZone">
                 <div className='dropZoneinner'>
                   <Dropzone style={styles.dropzone} onDrop={this.onDrop.bind(this)}>
                     <div>Try dropping some files here, or click to select files to upload.
                     {renderIf(this.state.imgFromFile === true)(
                       <div>
                         <canvas id="mainCanvas" width="auto" height="300"></canvas>
                       </div>
                     )}
                     </div>
                   </Dropzone>
                 </div>
               </div>
               <Button
                  label={'close'}
                  style={styles.button}
                  onClick={(e)=>this.forceUpdateUploads(e)}
                  primary={true}
                /><br/>
                </div>

              </Dialog>

            </div>
          );
        }
}

export default SendMail;
