

import React, { Component } from 'react';
import axios from 'axios';

class ListSavedJob extends Component {


    deleteSavedJob(e){
      e.preventDefault();

  //         console.log('this.props.goal.id in deleteItem in ListGoal', this.props.goal.id);
  //         console.log('this.props.goal._id in deleteItem in ListGoal', this.props.goal._id);
  // // /deleteItem/:delete_id
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

  render() {
          return (
            <div className='jobListing'>
              <h3><strong>{this.props.savedjob.jobTitle}</strong></h3>
              <h4>{this.props.savedjob.jobLink}</h4>
              <h4>{this.props.savedjob.companyName}</h4>
              <h4>{this.props.savedjob.jobLocation}</h4>
              <h4>{this.props.savedjob.jobDescription}</h4>
              <button onClick={(e)=>this.deleteSavedJob(e)}>Delete!</button>
            </div>
          );
        }
}

export default ListSavedJob;
