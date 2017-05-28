

import React,  { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import axios from 'axios';
import CalendarPage from './components/CalendarPage';
import GoalsPage from './components/GoalsPage';
import JobsPage from './components/JobsPage';
import ContactsPage from './components/ContactsPage';
import WelcomePage from './components/WelcomePage';
import AddData from './components/AddData';
import "./App.css";


class App extends Component {

  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {

        const xCalendarPagex = () => {
          return(
            <div>
              <CalendarPage/>
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
              <JobsPage/>
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

    return (
      <div className='container'>
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
            </nav>

            <Route exact path="/" component={xWelcomePagex}/>
            <Route path="/CalendarPage" component={xCalendarPagex}/>
            <Route path="/GoalsPage" component={xGoalsPagex}/>
            <Route path="/JobsPage" component={xJobsPagex}/>
            <Route path='/ContactsPage' component={xContactsPagex}/>
            <Route path='/WelcomePage' component={xWelcomePagex}/>
            <Route path='/AddData' component={xAddDatax}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App
