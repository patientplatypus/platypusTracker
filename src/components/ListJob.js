

import React, { Component } from 'react';
import axios from 'axios';


class ListJob extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  saveJob(e){
    e.preventDefault();

    axios.post('http://localhost:5000/jobs/addjob',{
      jobTitle: this.props.job.jobTitle,
      jobLink: this.props.job.jobLink,
      companyName: this.props.job.companyName,
      jobLocation: this.props.job.jobLocation,
      jobDescription: this.props.job.jobDescription
    })
      .then((response)=>{
        console.log("addjob response ", response);
        this.props.getJobsInfo();
      });
  }

//jobTitle jobLink companyName jobLocation jobDescription
  render() {
          return (
            <div className="jobListing">
              <h3><strong>{this.props.job.jobTitle}</strong></h3>
              <h4>{this.props.job.jobLink}</h4>
              <h4>{this.props.job.companyName}</h4>
              <h4>{this.props.job.jobLocation}</h4>
              <h4>{this.props.job.jobDescription}</h4>
              <button onClick={(e)=>this.saveJob(e)}>Save Job!</button>
            </div>
          );
        }
}

export default ListJob;
