

import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from './Button';




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
    width: "95%",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2A521',
    display: 'inline-block',
  },
  purplepaper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
  },
  dialog:{
    backgroundColor: "#7A5079",
    width: "100%",
    height: "100%"
  },
  dialogpurple:{
    width: "100%",
    height: "100%",
    backgroundColor: '#7A5079',
    padding: "10px"
  },
  select:{
    width: "80%",
    verticalAlign: "bottom"
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
  modify:{
    display: "inline"
  }
};



class ModifyGoal extends Component {
  constructor(props){
    super(props);

    this.state = {
      goal: this.props.goal,
      name: '',
      location: '',
      notes: ''
    }
  }

  calendarModify(e){
    e.preventDefault();

    var self = this;

    axios.patch('http://localhost:5000/calendar/modifygoal', {
      id: this.state.goal._id,
      name: this.state.name,
      notes: this.state.notes,
      location: this.state.location
    })
      .then((response)=>{
        console.log("result from calendarModify axios post is ", response)
        this.props.handleForceUpdate(self.props.goal.dateDue);
        this.props.setModify();
      })
      .catch(function(error){
          console.error(error);
      });
  }


  render() {
          return (
            <div>
              <p>Update Item</p>
                <TextField
                  hintText="name"
                  onChange={(e)=>this.setState({name: e.target.value })}
                  value={this.state.name}
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                /><br/>
                <TextField
                  hintText="location"
                  onChange={(e)=>this.setState({location: e.target.value })}
                  value={this.state.location}
                  style={styles.textInput}
                  inputStyle={styles.textInputInput}
                /><br/>
                <TextField
                  floatingLabelText="notes"
                  onChange={(e)=>this.setState({notes: e.target.value })}
                  value={this.state.text}
                  style={styles.textInput}
                  textareaStyle={styles.textInputInput}
                  multiLine={true}
                  rows={5}
                  /><br/>
                <Button
                   label={'modify'}
                   style={styles.button}
                   onClick={(e)=>this.calendarModify(e)}
                   secondary={true}
                 /><br/>
            </div>
          );
        }
}

export default ModifyGoal;
