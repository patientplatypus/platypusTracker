

import React, { Component } from 'react';


class ListSavedJob extends Component {

  render() {
          return (
            <div className='jobListing'>
              <h3><strong>{this.props.savedjob.jobTitle}</strong></h3>
              <h4>{this.props.savedjob.jobLink}</h4>
              <h4>{this.props.savedjob.companyName}</h4>
              <h4>{this.props.savedjob.jobLocation}</h4>
              <h4>{this.props.savedjob.jobDescription}</h4>
            </div>
          );
        }
}

export default ListSavedJob;
