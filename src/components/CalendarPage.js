

import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import axios from 'axios';
import ListGoal from './ListGoal';


class CalendarPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDay: null,
      allDays: [],
      puppies: "puppies",
      goalsToday: "nogoals",
      // haveGoalsToday: false
    }
    var self = this;
  }

  componentWillMount() {
    var self = this;
    console.log('inside getCalendarInfo');

      axios.post('http://localhost:5000/calendar/alldateinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((goal)=>{
              tempObj = {};
              tempObj.date = goal.dateDue;
              tempObj.name = goal.name;
              arryAll.push(tempObj);
            });
            self.setState({
              allDays: arryAll
            });
          });
  }

  getCalendarInfo(){
    var self = this;
    console.log('inside getCalendarInfo');
      axios.post('http://localhost:5000/calendar/alldateinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((goal)=>{
              tempObj = {};
              tempObj.date = goal.dateDue;
              tempObj.name = goal.name;
              arryAll.push(tempObj);
            });
            self.setState({
              allDays: arryAll
            });
          });
     this.forceUpdate();
  }



 renderDay(day) {
    const date = day.toLocaleDateString();
    const dateDisplay = day.getDate();
    const displayInfo = this.state.allDays;
      return (
        <div>
          {dateDisplay}
          <div className="Info-List">
            {
              displayInfo.map((goal, i) => (
                 (date==goal.date) ?
                  <div key={i}>
                    🎁 {goal.name}
                  </div>
                  :
                  <div key={i}/>
              ))}
          </div>
        </div>
      );
  }


  handleForceUpdate = (dateDue)=>{
    this.getCalendarInfo();
    console.log("value of this.goalsToday in handleForceUpdate ", this.state.goalsToday);
    // this.handleDayClick(this.state.selectedDay);

    var self = this;

    axios.post('http://localhost:5000/calendar/specificdateinfo',{
      datequery: dateDue
    })
      .then((response)=>{
        console.log("all the date info is ", response);
        if(response.data.length>0){
          self.setState({
            goalsToday: response
          });
        }else{
          self.setState({
            goalsToday: "nogoals"
          });
        }
      });
  }

  handleModify = () => {}



  handleDayClick = (day, { selected }) => {

    const self = this;

    var promise = new Promise((resolve)=>{
      self.setState({
        selectedDay: selected ? undefined : day
      }, ()=>resolve());
    });

    promise.then((resolve)=>{
        console.log('this.state.selectedDay ', self.state.selectedDay);

        if (this.state.selectedDay!=undefined){
          axios.post('http://localhost:5000/calendar/specificdateinfo',{
            datequery: self.state.selectedDay.toLocaleDateString()
          })
            .then((response)=>{
              console.log("all the date info is ", response);
              if(response.data.length>0){
                self.setState({
                  goalsToday: response
                });
              }else{
                self.setState({
                  goalsToday: "nogoals"
                });
              }
            });
        }else{
          self.setState({
            goalsToday: "nogoals"
          });
        }
    });

  }


  render() {

    let listGoals;

    if(this.state.goalsToday!="nogoals"){
      console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
          listGoals = this.state.goalsToday.data.map(goal => {
            return (
              <ListGoal handleModify={this.handleModify.bind(this)} handleForceUpdate={this.handleForceUpdate.bind(this)} key={goal._id} goal={goal} />
            );
          });
    }
    if(this.state.goalsToday==="nogoals"){
      console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
      listGoals = <div className="GoalsDue"><p>You have nothing due today!</p></div>
    }




    const { selectedDay } = this.state;
        return (
          <div>
            <div className='calendarContainer'>
              <div className='calendar'>
                <DayPicker
                  selectedDays={selectedDay}
                  numberOfMonths={1}
                  fixedWeeks
                  className="Info-List"
                  renderDay={this.renderDay.bind(this)}
                  onDayClick={this.handleDayClick}
                />
              </div>
            </div>
            <div className='calendarDetail'>
              <p>
                {selectedDay
                  ? selectedDay.toLocaleDateString()
                  : 'Please select a day'}
              </p>
            </div>

            <div className="goalsList">
                {listGoals}
            </div>

          </div>
        );
        }
}

export default CalendarPage;
