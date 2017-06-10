

import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
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
    //not totally sure how to change colors SADPANDA
    // backgroundColor: '#F3C677',
    // labelColor: '#7B1E7A'
  },
  textInput: {
    marginRight: '10px',
    color: '#F3C677',
  },
  textInputInput: {
    color: '#F3C677',
  },
  paper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    backgroundColor: '#7A5079',
    display: 'inline-block',
    margin: "10px auto",
  },
  handlesavedjob: {
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

class ListSavedJob extends Component {


    deleteSavedJob(e){
      e.preventDefault();
      var self = this;
      var url = 'http://localhost:5000/jobs/deleteItem/' + this.props.savedjob._id

      axios.delete(url)
        .then((response)=>{
          console.log('delete list item response is ', response);
          this.props.getJobsInfo();
        })
        .catch(function(error){
          console.error(error);
        })

    }


    handleSendJobtoEmail(e){
      e.preventDefault();
      this.props.sendSavedJobtoEmail(this.props.savedjob);
    }


  render() {
          return (
           <Paper style={styles.paper} zDepth={2}>
              <h3><strong>{this.props.savedjob.jobTitle}</strong></h3>
              <h4>{this.props.savedjob.jobLink}</h4>
              <h4>{this.props.savedjob.companyName}</h4>
              <h4>{this.props.savedjob.jobLocation}</h4>
              <h4>{this.props.savedjob.jobDescription}</h4>
              <h3>job status: {this.props.savedjob.jobStatus}</h3>
              <Button
                label={'delete job'}
                style={styles.handlesavedjob}
                primary={true}
                onClick={(e)=>this.deleteSavedJob(e)}
              />
              <br/>
              <Button
                label={'send to email'}
                style={styles.handlesavedjob}
                primary={false}
                secondary={true}
                onClick={(e)=>this.handleSendJobtoEmail(e)}
              />
            </Paper>
          );
        }
}

export default ListSavedJob;
