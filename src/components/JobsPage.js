import React, { Component } from 'react';
import axios from 'axios';
import ListJob from './ListJob';
import renderIf from 'render-if';
import ListSavedJob from './ListSavedJob';

class JobsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerm: "",
      searchCity: "",
      searchResults: [],
      savedJobs: [],
      showSaved: false,
      showSearch: true
    }
  }

  componentWillMount() {
    var self = this;
    // console.log('inside getCalendarInfo');
    //jobTitle jobLink companyName jobLocation jobDescription

      axios.post('http://localhost:5000/jobs/alljobinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((job)=>{
              tempObj = {};
              tempObj.jobTitle = job.jobTitle;
              tempObj.jobLink = job.jobLink;
              tempObj.companyName = job.companyName;
              tempObj.jobLocation = job.jobLocation;
              tempObj.jobDescription = job.jobDescription;

              arryAll.push(tempObj);
            });
            self.setState({
              savedJobs: arryAll
            });
          });
  }

  getJobsInfo(){
    var self = this;
      axios.post('http://localhost:5000/jobs/alljobinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((job)=>{
              tempObj = {};
              tempObj.jobTitle = job.jobTitle;
              tempObj.jobLink = job.jobLink;
              tempObj.companyName = job.companyName;
              tempObj.jobLocation = job.jobLocation;
              tempObj.jobDescription = job.jobDescription;

              arryAll.push(tempObj);
            });
            self.setState({
              savedJobs: arryAll
            });
          });
     this.forceUpdate();
  }

  searchJobs(e){
    e.preventDefault();
    var self = this;
    axios.post('http://localhost:5000/jobs/search',{
      searchTerm: this.state.searchTerm,
      searchCity: this.state.searchCity
    })
    .then((response)=>{
      console.log("back from searchJobs and the response is, ", response);
      self.setState({
        searchResults: response.data.returnedJobs
      })
    })
    .catch(()=>{
      console.log("in job catch");
    });
  }

  savedToggle(e){
    e.preventDefault();
    var self = this;
    if(self.state.showSaved===false){
      self.setState({
        showSaved: true
      })
    }
    if(self.state.showSaved===true){
      self.setState({
        showSaved: false
      })
    }
  }

  searchToggle(e){
    e.preventDefault();
    var self = this;
    if(self.state.showSearch===false){
      self.setState({
        showSearch: true
      })
    }
    if(self.state.showSearch===true){
      self.setState({
        showSearch: false
      })
    }
  }

  render() {

        // let listGoals;
        //
        // if(this.state.goalsToday!="nogoals"){
        //   console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
        //       listGoals = this.state.goalsToday.data.map(goal => {
        //         return (
        //           <ListGoal handleModify={this.handleModify.bind(this)} handleForceUpdate={this.handleForceUpdate.bind(this)} key={goal._id} goal={goal} />
        //         );
        //       });
        // }
        // if(this.state.goalsToday==="nogoals"){
        //   console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
        //   listGoals = <div className="GoalsDue"><p>You have nothing due today!</p></div>
        // }


            let listJobs;

            if(this.state.searchResults.length!=0){
              // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
                  listJobs = this.state.searchResults.map((job,i) => {
                    return (
                      <ListJob key={i} job={job} getJobsInfo={this.getJobsInfo.bind(this)}/>
                    );
                  });
            }
            if(this.state.searchResults.length===0){
              // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
              listJobs = <div><p>Search for jobs to populate!</p></div>
            }

            let listSavedJobs;

            if(this.state.savedJobs.length!=0){
              // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
                  listSavedJobs = this.state.savedJobs.map((savedjob,i) => {
                    return (
                      <ListSavedJob key={i} savedjob={savedjob} />
                    );
                  });
            }
            if(this.state.savedJobs.length===0){
              // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
              listSavedJobs = <div><p>You have no saved jobs!</p></div>
            }



          return (
            <div>
              <h1>Jobs Page</h1>
              <h3>Search for Jobs!</h3>
              <form>
                <input
                        onChange={(e)=>this.setState({searchTerm: e.target.value })}
                        type="text"
                        name="searchTerm"
                        id="searchTerm"
                        placeholder="search term"/>
                <input
                        onChange={(e)=>this.setState({searchCity: e.target.value })}
                        type="text"
                        name="searchCity"
                        id="searchCity"
                        placeholder="search city"/>
                <button onClick={(e)=>this.searchJobs(e)}>Search!</button>
              </form>

              <div className="jobsList">
                <h3>Listings from Indeed</h3>
                {renderIf(this.state.showSearch === false)(
                  <button onClick={(e)=>this.searchToggle(e)}>Show Jobs Listings</button>
                )}
                {renderIf(this.state.showSearch === true)(
                  <div>
                    <button onClick={(e)=>this.searchToggle(e)}>Hide Jobs Listings</button>
                    {listJobs}
                  </div>
                )}



              </div>

              <div className="savedJobsList jobsList">
                <h3>Platypus Saved Job Listings</h3>
                {renderIf(this.state.showSaved === false)(
                  <button onClick={(e)=>this.savedToggle(e)}>Show Saved Jobs</button>
                )}
                {renderIf(this.state.showSaved === true)(
                  <div>
                    <button onClick={(e)=>this.savedToggle(e)}>Hide Saved Jobs</button>
                    {listSavedJobs}
                  </div>
                )}
              </div>

            </div>
          );
        }
}

export default JobsPage;
