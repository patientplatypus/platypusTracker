

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
  saveJob: {
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






class ListJobBuilt extends Component {


saveJob(e){
  e.preventDefault();

  axios.post('http://localhost:5000/jobs/addjob',{
    jobTitle: this.props.job.jobTitle,
    jobLink: this.props.job.jobLink,
    companyName: this.props.job.companyName,
    jobLocation: "",
    jobDescription: ""
  })
    .then((response)=>{
      console.log("addjob response ", response);
      this.props.getJobsInfo();
    });
}


  render() {
          return (
            <Paper style={styles.paper} zDepth={2}>
              <h3><strong>{this.props.job.jobTitle}</strong></h3>
              <h4>{this.props.job.jobLink}</h4>
              <h4>{this.props.job.companyName}</h4>
              <h4>{this.props.job.daysAgo}</h4>
              <Button
                label={'save job'}
                style={styles.saveJob}
                primary={false}
                secondary={true}
                onClick={(e)=>this.saveJob(e)}
              />
            </Paper>
          );
        }
}

export default ListJobBuilt;
