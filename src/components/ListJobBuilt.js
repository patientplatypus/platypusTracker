

import React, { Component } from 'react';
import axios from 'axios';

class ListJobBuilt extends Component {

//jobTitle jobLink companyName daysAgo
// <div className="jobListing">
//   <h3><strong>{this.props.job.jobTitle}</strong></h3>
//   <h4>{this.props.job.jobLink}</h4>
//   <h4>{this.props.job.companyName}</h4>
//   <h4>{this.props.job.jobLocation}</h4>
//   <h4>{this.props.job.jobDescription}</h4>
//   <button onClick={(e)=>this.saveJob(e)}>Save Job!</button>
// </div>
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
            <div className='jobListing'>
              <h3><strong>{this.props.job.jobTitle}</strong></h3>
              <h4>{this.props.job.jobLink}</h4>
              <h4>{this.props.job.companyName}</h4>
              <h4>{this.props.job.daysAgo}</h4>
              <button onClick={(e)=>this.saveJob(e)}>Save Job!</button>
            </div>
          );
        }
}

export default ListJobBuilt;
