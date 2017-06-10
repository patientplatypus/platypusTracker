import React, { Component } from 'react';
import axios from 'axios';
import ListJob from './ListJob';
import ListJobBuilt from './ListJobBuilt';
import TextField from 'material-ui/TextField';
import Button from './Button';
import renderIf from 'render-if';
import Paper from 'material-ui/Paper';
import ListSavedJob from './ListSavedJob';



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
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2DCB5',
    display: 'inline-block',
  },
  purplepaper:{
      height: "auto",
      width: "auto",
      paddingLeft: "20px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingRight: "20px",
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
      loading: false,
      haveSearched: false
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
              tempObj.jobStatus = job.jobStatus;
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
              tempObj.jobStatus = job.jobStatus;
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
        loading: false,
        haveSearched: true
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
                      <ListSavedJob key={i} savedjob={savedjob} getJobsInfo={this.getJobsInfo.bind(this)} sendSavedJobtoEmail={this.props.sendSavedJobtoEmail.bind(this)}/>
                    );
                  });
            }
            if(this.state.savedJobs.length===0){
              // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
              listSavedJobs = <div><p>You have no saved jobs!</p></div>
            }



          return (
            <div>
              <Paper style={styles.purplepaper} zDepth={2}>
              <TextField
                hintText="search term"
                onChange={(e)=>this.setState({searchTerm: e.target.value })}
                style={styles.textInput}
                inputStyle={styles.textInputInput}
              />

              <TextField
                hintText="search city"
                onChange={(e)=>this.setState({searchCity: e.target.value })}
                style={styles.textInput}
                inputStyle={styles.textInputInput}
              />

              <Button
                 label={'search'}
                 style={styles.button}
                 onClick={(e)=>this.searchJobs(e)}
                 primary={true}
               />
              </Paper>

               {renderIf(this.state.loading === true)(
                 <Paper style={styles.loadingContainer} zDepth={2}>
                   <p className="loadingText">Loading!</p>
                   <img className="loadingPlatypus" src='http://orig07.deviantart.net/e9e4/f/2015/145/5/b/5bfba23d515a76f42c3751d4b60dde64-d8uovty.gif'/>
                 </Paper>
               )}


               {renderIf(this.state.haveSearched === false)(
                 <Paper style={styles.paper} zDepth={2}>
                   <div>
                     <strong>Search to display job listings from Indeed and Built-In-Austin</strong>
                   </div>
                 </Paper>
               )}

                {renderIf(this.state.haveSearched === true)(
                  <Paper style={styles.paper} zDepth={2}>
                    <h3>Listings from Indeed</h3>
                  {renderIf(this.state.showSearch === false)(
                    <Button
                      label={'show'}
                      style={styles.showhide}
                      primary={true}
                      onClick={(e)=>this.searchToggle(e)}
                    />
                  )}
                  {renderIf(this.state.showSearch === true)(
                    <div>
                      <Button
                        label={'hide'}
                        style={styles.showhide}
                        primary={true}
                        onClick={(e)=>this.searchToggle(e)}
                      />
                      {listJobs}
                    </div>
                  )}
                  </Paper>
                )}



                {renderIf(this.state.haveSearched === true)(
                  <Paper style={styles.paper} zDepth={2}>
                    <h3>Listings from Built-In-Austin</h3>
                  {renderIf(this.state.showSearchBuilt === false)(
                    <Button
                      label={'show'}
                      style={styles.showhide}
                      primary={true}
                      onClick={(e)=>this.searchToggleBuilt(e)}
                    />
                  )}
                  {renderIf(this.state.showSearchBuilt === true)(
                    <div>
                      <Button
                        label={'hide'}
                        style={styles.showhide}
                        primary={true}
                        onClick={(e)=>this.searchToggleBuilt(e)}
                      />
                      {listJobsBuilt}
                    </div>
                  )}
                  </Paper>
                )}


              <Paper style={styles.paper} zDepth={2}>
                <h3>Platypus Saved Job Listings</h3>
                {renderIf(this.state.showSaved === false)(
                  <Button
                    label={'show'}
                    style={styles.showhide}
                    primary={true}
                    onClick={(e)=>this.savedToggle(e)}
                  />
                )}
                {renderIf(this.state.showSaved === true)(
                  <div>
                    <Button
                      label={'hide'}
                      style={styles.showhide}
                      primary={true}
                      onClick={(e)=>this.savedToggle(e)}
                    />
                    {listSavedJobs}
                  </div>
                )}
              </Paper>

            </div>
          );
        }
}

export default JobsPage;
