

import React, { Component } from 'react';
import axios from 'axios';
import ListContact from './ListContact';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from './Button';
import {orange500, blue500} from 'material-ui/styles/colors';
import renderIf from 'render-if';



const styles = {
  base: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
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
  paper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2DCB5',
    display: 'inline-block',
  },
  purplepaper:{
    height: "auto",
    width: "40%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
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
  }
};




class ContactsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      linkedIn: "",
      profilePic: "",
      email: "",
      phone: "",
      github: "",
      notes: "",
      contactResults: [],
      searchTerm: "",
      anyDisplayed: true
    }
  }

  componentWillMount() {
    var self = this;
      axios.post('http://localhost:5000/contacts/allcontactinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((contact)=>{
              tempObj = {};
              tempObj.name = contact.name;
              tempObj.linkedIn = contact.linkedIn;
              tempObj.profilePic = contact.profilePic;
              tempObj.email = contact.email;
              tempObj.phone = contact.phone;
              tempObj.github = contact.github;
              tempObj.notes = contact.notes;
              tempObj._id = contact._id;

              arryAll.push(tempObj);
            });
            self.setState({
              contactResults: arryAll
            });
          });
  }

  getContactsInfo(){
    var self = this;
      axios.post('http://localhost:5000/contacts/allcontactinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((contact)=>{
              tempObj = {};
              tempObj.name = contact.name;
              tempObj.linkedIn = contact.linkedIn;
              tempObj.profilePic = contact.profilePic;
              tempObj.email = contact.email;
              tempObj.phone = contact.phone;
              tempObj.github = contact.github;
              tempObj.notes = contact.notes;
              tempObj._id = contact._id;

              arryAll.push(tempObj);
            });
            self.setState({
              contactResults: arryAll
            });
          });
     this.forceUpdate();
  }




  contactAdd(e){
    e.preventDefault();
    var self = this;
    axios.post('http://localhost:5000/contacts/addcontact', {
      linkedIn: this.state.linkedIn,
      name: this.state.name,
      profilePic: this.state.profilePic,
      email: this.state.email,
      phone: this.state.phone,
      github: this.state.github,
      notes: this.state.notes
    })
      .then((response)=>{
        console.log("result from contactAdd axios post is ", response)
        self.getContactsInfo();
        self.setState({
          linkedIn: "",
          name: "",
          profilePic: "",
          email: "",
          phone: "",
          github: "",
          notes: ""
        })
      })
      .catch(function(error){
          console.error(error);
      });
  }


  render() {

    let listContacts;

    if(this.state.searchTerm===""){
      if(this.state.contactResults.length!=0){

          // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
              listContacts = this.state.contactResults.map((contact,i) => {
                return (
                  <ListContact key={i} contact={contact}
                    getContactsInfo={this.getContactsInfo.bind(this)}
                    sendSavedContacttoEmail={this.props.sendSavedContacttoEmail.bind(this)}/>
                );
              });
        }

        // if(this.state.contactResults.length===0){
        //   // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
        //   listContacts = <div><p>Add contacts to populate!</p></div>
        // }
    }else{
      if(this.state.contactResults.length!=0){
        var displayEverTrue = false;
        console.log("this.state.contactResults ", this.state.contactResults);

            listContacts = this.state.contactResults.map((contact,i)=>{
              console.log("contact.name ", contact.name);
              var displayItem = false;

              for(var y=0; y<this.state.searchTerm.length; y++){
                if(y<contact.name.length){
                  if(this.state.searchTerm[y]===contact.name[y]){
                    displayItem = true;
                  }else{
                    displayItem = false;
                  }
                }else{
                  displayItem = false;
                }
              }

              if (displayItem === true){
                console.log('inside displayItem true');
                displayEverTrue=true;
                return(
                  <ListContact key={i} contact={contact} getContactsInfo={this.getContactsInfo.bind(this)}
                  sendSavedContacttoEmail={this.props.sendSavedContacttoEmail.bind(this)}/>
                );
              }
              if(displayEverTrue===false && (i === this.state.contactResults.length-1)){
                return(
                   <Paper style={styles.purplepaper} zDepth={2}><p>No Contacts Found</p></Paper>
                );
              }

          });








        // var filteredNames = this.state.contactResults.name.filter((el) =>
        //   el.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
        // )
        //
        // for(var x=0; x<this.state.contactResults.length; x++){
        //   for(var y=0; y<filteredNames.length; y++){
        //     if (this.state.contactResults[x].name === filteredNames[y]){
        //       <ListContact key={x} contact={this.state.contactResults[x]}/>
        //     }
        //   }
        // }

      }

      // if(this.state.contactResults.length===0){
      //   // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
      //   listContacts=<Paper style={styles.purplepaper} zDepth={2}><p>No Contacts Found</p></Paper>
      // }
    }
// className='contactsPageContainer'
  // <div className="addForm Container">
  // <h1>Contacts</h1>
  // <h3>Add Contact!</h3>





          return (
            <div>
            <Paper style={styles.purplepaper} zDepth={2}>
                  <TextField
                    hintText="name"
                    onChange={(e)=>this.setState({name: e.target.value })}
                    value = {this.state.name}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    hintText="profile picture"
                    onChange={(e)=>this.setState({profilePic: e.target.value })}
                    value = {this.state.profilePic}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    hintText="linkedIn"
                    onChange={(e)=>this.setState({linkedIn: e.target.value })}
                    value = {this.state.linkedIn}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    hintText="email"
                    onChange={(e)=>this.setState({email: e.target.value })}
                    value = {this.state.email}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    hintText="phone"
                    onChange={(e)=>this.setState({phone: e.target.value })}
                    value = {this.state.phone}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    hintText="github"
                    onChange={(e)=>this.setState({github: e.target.value })}
                    value = {this.state.github}
                    style={styles.textInput}
                    inputStyle={styles.textInputInput}
                  /><br/>
                  <TextField
                    floatingLabelText="notes"
                    onChange={(e)=>this.setState({notes: e.target.value })}
                    value = {this.state.notes}
                    style={styles.textInput}
                    textareaStyle={styles.textInputInput}
                    multiLine={true}
                    rows={5}
                    /><br/>
                  <Button
                     label={'add contact'}
                     style={styles.button}
                     onClick={(e)=>this.contactAdd(e)}
                     primary={true}
                   /><br/>

                    <TextField
                      hintText="search contacts"
                      onChange={(e)=>this.setState({searchTerm: e.target.value })}
                      style={styles.textInput}
                      inputStyle={styles.textInputInput}
                    /><br/>
              </Paper>

              <br/>

              <Paper style={styles.paper} zDepth={2}>
                {listContacts}
              </Paper>

            </div>
          );
        }
}

export default ContactsPage;
