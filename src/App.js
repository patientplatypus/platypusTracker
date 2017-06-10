

import React,  { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { VoicePlayer, VoiceRecognition } from "react-voice-components";
// import Speech from 'react-speech';
import CalendarPage from './components/CalendarPage';
import JobsPage from './components/JobsPage';
import ContactsPage from './components/ContactsPage';
import FindMeetups from './components/FindMeetups';
import AddData from './components/AddData';
import SendMail from './components/SendMail';
import UploadFiles from './components/UploadFiles';
import renderIf from 'render-if';
import Button from './components/Button';
import "./App.css";


// var initializedSpeech = false;
// var innerhtml = '';

const styles = {
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
  }
};



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      initializedSpeech: false,
      redirect: "",
      savedJobtoEmail: {},
      savedContacttoEmail: {},
      updatedJob: false,
      updatedEmail: false
    }
  }

  // componentDidMount() {
  //
  // }


  removeJobandContact(){
    var self = this;
    self.setState({
      savedJobtoEmail: {},
      savedContacttoEmail: {},
    })
  }




  sendSavedJobtoEmail(savedJob){
    var self = this;
    self.setState({
      redirect: "email",
      savedJobtoEmail:savedJob,
      updatedJob: true,
      updatedEmail: false
    }, ()=>{
      setTimeout(function(){
        self.setState({
          redirect: ""
        })
      },1000)
    })
  }

  sendSavedContacttoEmail(savedContact){
    var self = this;
    self.setState({
      redirect: "email",
      savedContacttoEmail:savedContact,
      updatedJob: false,
      updatedEmail: true
    }, ()=>{
      setTimeout(function(){
        self.setState({
          redirect: ""
        })
      },1000)
    })
  }

  render() {



        const xCalendarPagex = () => {
          return(
            <div>
              <CalendarPage/>
            </div>
          )
        }

        const xUploadFilesx = () => {
          return(
            <div>
              <UploadFiles/>
            </div>
          )
        }

        const xJobsPagex = () => {
          return(
            <div>
              <JobsPage sendSavedJobtoEmail={this.sendSavedJobtoEmail.bind(this)}/>
            </div>
          )
        }

        const xContactsPagex = () => {
          return(
            <div>
              <ContactsPage sendSavedContacttoEmail={this.sendSavedContacttoEmail.bind(this)}/>
            </div>
          )
        }

        const xFindMeetupsx = () => {
          return(
            <div>
              <FindMeetups/>
            </div>
          )
        }


        const xSendMailx = () => {
          return(
            <div>
              <SendMail savedJobtoEmail={this.state.savedJobtoEmail} savedContacttoEmail={this.state.savedContacttoEmail}
              updatedJob={this.state.updatedJob}
              updatedEmail={this.state.updatedEmail}
              removeJobandContact={this.removeJobandContact.bind(this)}/>
            </div>
          )
        }

        const Speechy = ()=>{
          console.log('inside Speechy');
          var self = this;
          if (this.state.initializedSpeech===false) {
          // if (initializedSpeech===false){
            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
            recognition.stop();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 5;
            recognition.start();

            [
             'onaudiostart',
             'onaudioend',
             'onend',
             'onerror',
             'onnomatch',
             'onresult',
             'onsoundstart',
             'onsoundend',
             'onspeechend',
             'onstart'
            ].forEach(function(eventName) {
                recognition[eventName] = function(e) {
                    // console.log(eventName, e);
                    if (eventName === 'onend'){
                      recognition.start();
                    }
                };
            });

            recognition.onresult = function(event) {
                console.log('You said: ', event.results[0][0].transcript);

                if (event.results[0][0].transcript==="ping"){
                  // console.log('pong');
                  var voices = speechSynthesis.getVoices();
                  var u = new SpeechSynthesisUtterance();
                  u.text = 'The quick brown fox jumped over the lazy brown dog';

                  speechSynthesis.speak(u);
                }



                if (event.results[0][0].transcript==="go to meet ups"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "meetups"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }


                if (event.results[0][0].transcript==="go to calendar"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "calendar"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }

                if (event.results[0][0].transcript==="go to contacts"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "contacts"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }

                if (event.results[0][0].transcript==="go to jobs"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "jobs"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }

                if (event.results[0][0].transcript==="go to email"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "email"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }



            };

            this.setState({
              initializedSpeech: true
            })

          // initializedSpeech=true;
          }
          return(<div></div>)
          // return(<div dangerouslySetInnerHTML={{__html: innerhtml}}/>)
        }



    return (
      <MuiThemeProvider>
      <div className='container'>
        <Speechy/>
        <Router>
          <div>



          <div className="headerContainer">

            <img className="platypusIcon" src='http://piq.codeus.net/static/media/userpics/piq_222946_400x400.png'/>
            <h1 className="platypusHeader">platypusTracker</h1>

          </div>

            <nav className='tabs'>

              <Button
                label={'Calendar'}
                style={styles.button}
                primary={false}
                secondary={true}
                onClick={(e)=>{
                  e.preventDefault();
                  var self = this;
                  self.setState({
                    redirect: "calendar"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },50)
                  })
                }}
              />

              <Button
                label={'Meetups'}
                style={styles.button}
                primary={true}
                secondary={false}
                onClick={(e)=>{
                  e.preventDefault();
                  var self = this;
                  self.setState({
                    redirect: "meetups"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },50)
                  })
                }}
              />

              <Button
                label={'Jobs'}
                style={styles.button}
                primary={true}
                secondary={false}
                onClick={(e)=>{
                  e.preventDefault();
                  var self = this;
                  self.setState({
                    redirect: "jobs"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },50)
                  })
                }}
              />

              <Button
                label={'Contacts'}
                style={styles.button}
                primary={true}
                secondary={false}
                onClick={(e)=>{
                  e.preventDefault();
                  var self = this;
                  self.setState({
                    redirect: "contacts"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },50)
                  })
                }}
              />

              <Button
                label={'Email'}
                style={styles.button}
                primary={true}
                secondary={false}
                onClick={(e)=>{
                  e.preventDefault();
                  var self = this;
                  self.setState({
                    redirect: "email"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },50)
                  })
                }}
              />







            </nav>

            <Route exact path="/" component={xCalendarPagex}/>
            <Route path="/CalendarPage" component={xCalendarPagex}/>
            <Route path="/JobsPage" component={xJobsPagex}/>
            <Route path='/ContactsPage' component={xContactsPagex}/>
            <Route path='/FindMeetups' component={xFindMeetupsx}/>
            <Route path='/SendMail' component={xSendMailx}/>





            {renderIf(this.state.redirect === "meetups")(
              <Redirect to="/FindMeetups" push/>
            )}
            {renderIf(this.state.redirect === "contacts")(
              <Redirect to="/ContactsPage" push/>
            )}
            {renderIf(this.state.redirect === "jobs")(
              <Redirect to="/JobsPage" push/>
            )}
            {renderIf(this.state.redirect === "calendar")(
              <Redirect to="/CalendarPage" push/>
            )}
            {renderIf(this.state.redirect === "email")(
              <Redirect to="/SendMail" push/>
            )}



          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App
