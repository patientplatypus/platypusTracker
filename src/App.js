

import React,  { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
// import { VoicePlayer, VoiceRecognition } from "react-voice-components";
// import Speech from 'react-speech';
import CalendarPage from './components/CalendarPage';
import GoalsPage from './components/GoalsPage';
import JobsPage from './components/JobsPage';
import ContactsPage from './components/ContactsPage';
import WelcomePage from './components/WelcomePage';
import AddData from './components/AddData';
import SendMail from './components/SendMail';
import UploadFiles from './components/UploadFiles';
import renderIf from 'render-if';
import "./App.css";


// var initializedSpeech = false;
// var innerhtml = '';





class App extends Component {

  constructor(props){
    super(props);
    this.state={
      initializedSpeech: false,
      redirect: "",
      savedJobtoEmail: {}
    }
  }

  // componentDidMount() {
  //
  // }


  sendSavedJobtoEmail(savedJob){
    var self = this;
    self.setState({
      redirect: "email",
      savedJobtoEmail:savedJob
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

        const xGoalsPagex = () => {
          return(
            <div>
              <GoalsPage/>
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
              <ContactsPage/>
            </div>
          )
        }

        const xWelcomePagex = () => {
          return(
            <div>
              <WelcomePage/>
            </div>
          )
        }

        const xAddDatax = () => {
          return(
            <div>
              <AddData/>
            </div>
          )
        }

        const xSendMailx = () => {
          return(
            <div>
              <SendMail savedJobtoEmail={this.state.savedJobtoEmail}/>
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

                if (event.results[0][0].transcript==="go to data"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "AddData"
                  }, ()=>{
                    setTimeout(function(){
                      self.setState({
                        redirect: ""
                      })
                    },1000)
                  })
                }

                if (event.results[0][0].transcript==="go to welcome page"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "WelcomePage"
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

                if (event.results[0][0].transcript==="go to goals"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "goals"
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

                if (event.results[0][0].transcript==="go to upload"){
                  console.log('attempting...');
                  self.setState({
                    redirect: "upload"
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
      <div className='container'>
        <Speechy/>
        <Router>
          <div>



          <div className="headerContainer">

            <img className="platypusIcon" src='http://piq.codeus.net/static/media/userpics/piq_222946_400x400.png'/>
            <h1 className="platypusHeader">platypusTracker</h1>

          </div>

            <nav className='tabs'>
              <li><Link to="/WelcomePage">Good Morning, Platypus</Link></li>
              <li><Link to="/CalendarPage">Platypus Calendar</Link></li>
              <li><Link to="/GoalsPage">Platypus Goals</Link></li>
              <li><Link to="/JobsPage">Platypus Jobs</Link></li>
              <li><Link to="/ContactsPage">Platypus Contacts</Link></li>
              <li><Link to="/AddData">Platypus Data Dashboard</Link></li>
              <li><Link to="/SendMail">Email</Link></li>
              <li><Link to="/UploadFiles">Upload Files</Link></li>

            </nav>

            <Route exact path="/" component={xWelcomePagex}/>
            <Route path="/CalendarPage" component={xCalendarPagex}/>
            <Route path="/GoalsPage" component={xGoalsPagex}/>
            <Route path="/JobsPage" component={xJobsPagex}/>
            <Route path='/ContactsPage' component={xContactsPagex}/>
            <Route path='/WelcomePage' component={xWelcomePagex}/>
            <Route path='/AddData' component={xAddDatax}/>
            <Route path='/SendMail' component={xSendMailx}/>
            <Route path='/UploadFiles' component={xUploadFilesx}/>



            {renderIf(this.state.redirect === "AddData")(
              <Redirect to="/AddData" push/>
            )}
            {renderIf(this.state.redirect === "WelcomePage")(
              <Redirect to="/WelcomePage" push/>
            )}
            {renderIf(this.state.redirect === "contacts")(
              <Redirect to="/ContactsPage" push/>
            )}
            {renderIf(this.state.redirect === "jobs")(
              <Redirect to="/JobsPage" push/>
            )}
            {renderIf(this.state.redirect === "goals")(
              <Redirect to="/GoalsPage" push/>
            )}
            {renderIf(this.state.redirect === "calendar")(
              <Redirect to="/CalendarPage" push/>
            )}
            {renderIf(this.state.redirect === "email")(
              <Redirect to="/SendMail" push/>
            )}
            {renderIf(this.state.redirect === "upload")(
              <Redirect to="/UploadFiles" push/>
            )}


          </div>
        </Router>
      </div>
    );
  }
}

export default App
