

import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import axios from 'axios';
import ListGoal from './ListGoal';



// const birthdays = {
//   3: [{ name: 'Mirko', age: 35 }, { name: 'Gianluca', age: 29 }],
//   8: [{ name: 'Elena', age: 21 }],
//   9: [{ name: 'Irene', age: 43 }],
//   12: [{ name: 'Paolo', age: 78 }, { name: 'Giorgia', age: 18 }],
//   18: [{ name: 'Claudia', age: 54 }],
//   22: [{ name: 'Maria', age: 9 }, { name: 'Luigi', age: 67 }],
//   25: [{ name: 'Simone', age: 31 }],
//   26: [{ name: 'Marta', age: 46 }],
// };

// const displayInfo = ()=>{
//     axios.post('http://localhost:5000/calendar/alldateinfo')
//       .then((response)=>{
//           var arryAll = [];
//           var tempObj = {};
//
//           response.data.forEach((goal)=>{
//             tempObj = {};
//             tempObj.date = goal.dateDue;
//             tempObj.name = goal.name;
//             arryAll.push(tempObj);
//           });
//
//           return(arryAll);
//           // self.setState({
//           //   allDays: arryAll
//           // });
//         });
// }

// function renderDay(day) {
//   const date = day.getDate();
//   console.log('the value of day (localdatestring) is, ', day.toLocaleDateString());
//   return (
//     <div>
//       {date}
//       <div className="Birthdays-List">
//         {birthdays[date] &&
//           birthdays[date].map((birthday, i) => (
//             <div key={i}>
//               🎁 {birthday.name} ({birthday.age})
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// function renderDay(day) {
//   const date = day.toLocaleDateString();
//   const dateDisplay = day.getDate();
//   // console.log('the value of day (localdatestring) is, ', day.toLocaleDateString());
//   console.log("value of displayInfo is, ", displayInfo);
//   return (
//     <div>
//       {dateDisplay}
//       <div className="Info-List">
//         {displayInfo[date] &&
//           displayInfo[date].map((displayInfo, i) => (
//             <div key={i}>
//               🎁 {displayInfo.name} ({displayInfo.dateDue})
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }






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



 renderDay(day) {
    const date = day.toLocaleDateString();
    const dateDisplay = day.getDate();
    // console.log('the value of day (localdatestring) is, ', day.toLocaleDateString());
    // console.log("value of displayInfo is, ", displayInfo);
    const displayInfo = this.state.allDays;
    console.log("value of displayInfo is ", displayInfo);
    // console.log("value of this", this);
    // console.log("value of this.state.allDays", this.state.allDays);

      // const date = day.getDate();



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

      // displayInfo.forEach((goal)=>{
      //
      //   if (date==goal.date){
      //     return (
      //       <div>
      //         {dateDisplay}
      //         <div className="Info-List">
      //           {date &&
      //             displayInfo.map((goal, i) => (
      //               <div key={i}>
      //                 🎁 {goal.date} {goal.name}
      //               </div>
      //             ))}
      //         </div>
      //       </div>
      //     );
      //   }else{
      //     return (
      //       <div>
      //         {dateDisplay}
      //         <div className="Info-List">
      //           {date &&
      //             displayInfo.map((goal, i) => (
      //               <div key={i}>
      //                 <p> </p>
      //               </div>
      //             ))}
      //         </div>
      //       </div>
      //     );
      //   }
      // });






    //
    // var index=0;
    //
    //
    // displayInfo.forEach((goal)=>{
    //   // console.log("inside the displayInfo loop and the value of date is, ", date, " and the value of goal is ", goal.date);
    //
    //   if (date==goal.date){
    //     console.log("*************************************************inside the equality for displayInfo*************************************************")
    //     console.log('value of goal.name, ', goal.name, ' value of goal.date ', goal.date);
    //     return(
    //       <div>
    //         {dateDisplay}
    //         <div key={index} className="Info-List">
    //           🎁 {goal.name} ({goal.date})
    //         </div>
    //       </div>
    //     );
    //   }else{
    //     // console.log('+++++++++++++++++++++++++inside the else statement+++++++++++++++++++++++++');
    //     return(
    //       <div className="Info-List">
    //         {dateDisplay}
    //       </div>
    //     )
    //   }
    //   index++;
    // });



  }




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
    // var self = this;

    // const { haveGoalsToday } = false;

    if(this.state.goalsToday!="nogoals"){
      console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
          listGoals = this.state.goalsToday.data.map(goal => {
            return (
              <ListGoal key={goal._id} goal={goal} />
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
