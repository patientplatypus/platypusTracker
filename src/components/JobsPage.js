import React, { Component } from 'react';
import axios from 'axios';
import ListJob from './ListJob';
import ListJobBuilt from './ListJobBuilt';
import renderIf from 'render-if';
import ListSavedJob from './ListSavedJob';

class JobsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerm: "",
      searchCity: "",
      searchResults: [],
      searchResultsBuilt:[],
      savedJobs: [],
      showSaved: false,
      showSearch: true,
      showSearchBuilt: true,
      loading: false
    }
  }

  componentWillMount() {
    var self = this;
    // console.log('inside getCalendarInfo');
    //jobTitle jobLink companyName jobLocation jobDescription
    //http://orig07.deviantart.net/e9e4/f/2015/145/5/b/5bfba23d515a76f42c3751d4b60dde64-d8uovty.gif
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
              tempObj._id = job._id;

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
              tempObj._id = job._id;

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
    self.setState({
      loading:true
    })
    axios.post('http://localhost:5000/jobs/search',{
      searchTerm: this.state.searchTerm,
      searchCity: this.state.searchCity
    })
    .then((response)=>{
      console.log("back from searchJobs and the response is, ", response);
      self.setState({
        searchResults: response.data.returnedJobs,
        searchResultsBuilt: response.data.returnedJobsBuilt,
        loading: false
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

  searchToggleBuilt(e){
    e.preventDefault();
    var self = this;
    if(self.state.showSearchBuilt===false){
      self.setState({
        showSearchBuilt: true
      })
    }
    if(self.state.showSearchBuilt===true){
      self.setState({
        showSearchBuilt: false
      })
    }
  }

  render() {

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


            let listJobsBuilt;

            if(this.state.searchResultsBuilt.length!=0){
              // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
                  listJobsBuilt = this.state.searchResultsBuilt.map((job,i) => {
                    return (
                      <ListJobBuilt key={i} job={job} getJobsInfo={this.getJobsInfo.bind(this)}/>
                    );
                  });
            }
            if(this.state.searchResultsBuilt.length===0){
              // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
              listJobsBuilt = <div><p>Search for jobs to populate!</p></div>
            }



            let listSavedJobs;

            if(this.state.savedJobs.length!=0){
              // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
                  listSavedJobs = this.state.savedJobs.map((savedjob,i) => {
                    return (
                      <ListSavedJob key={i} savedjob={savedjob} getJobsInfo={this.getJobsInfo.bind(this)}/>
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
                {renderIf(this.state.loading === true)(
                  <div>
                    <p>Loading!</p>
                    <img className="loadingPlatypus" src='http://orig07.deviantart.net/e9e4/f/2015/145/5/b/5bfba23d515a76f42c3751d4b60dde64-d8uovty.gif'/>
                  </div>
                )}
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

              <div className="jobsList">
                <h3>Listings from Built-In-Austin</h3>
                {renderIf(this.state.showSearchBuilt === false)(
                  <button onClick={(e)=>this.searchToggleBuilt(e)}>Show Jobs Listings</button>
                )}
                {renderIf(this.state.showSearchBuilt === true)(
                  <div>
                    <button onClick={(e)=>this.searchToggleBuilt(e)}>Hide Jobs Listings</button>
                    {listJobsBuilt}
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
