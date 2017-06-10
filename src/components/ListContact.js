

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
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
    width: "90%",
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




class ListContact extends Component {


  deleteContact(e){
    e.preventDefault();
    var self = this;
    var url = 'http://localhost:5000/contacts/deleteContact/' + this.props.contact._id

    axios.delete(url)
      .then((response)=>{
        console.log('delete list item response is ', response);
        this.props.getContactsInfo();
      })
      .catch(function(error){
        console.error(error);
      })

  }


  handleSendContacttoEmail(e){
    e.preventDefault();
    // debugger;
    this.props.sendSavedContacttoEmail(this.props.contact);
  }


  render() {
          return (
            <Paper style={styles.purplepaper} zDepth={2}>
              <h4><strong>{this.props.contact.name}</strong></h4>
              {renderIf(this.props.contact.profilePic!='')(
                <img src={this.props.contact.profilePic}/>
              )}
              <p>{this.props.contact.linkedIn}</p>
              <p>{this.props.contact.email}</p>
              <p>{this.props.contact.phone}</p>
              <p>{this.props.contact.github}</p>
              <p>{this.props.contact.notes}</p>
              <Button
                 label={'email this contact'}
                 style={styles.button}
                 onClick={(e)=>this.handleSendContacttoEmail(e)}
                 secondary={true}
               />
               <Button
                  label={'delete'}
                  style={styles.button}
                  onClick={(e)=>this.deleteContact(e)}
                  primary={true}
                />
            </Paper>
          );
        }
}

export default ListContact;
