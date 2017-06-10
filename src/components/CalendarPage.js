

import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import axios from 'axios';
import ListGoal from './ListGoal';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from './Button';
import Dialog from 'material-ui/Dialog';


// for google maps
// key=AIzaSyBKSMaMwm7UTigL5sZGHS2VA0JUfghcSI4


const styles = {
  base: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
    marginLeft: "10px"
    //not totally sure how to change colors SADPANDA
    // backgroundColor: '#F3C677',
    // labelColor: '#7B1E7A'
  },
  textInput: {
    marginRight: '10px',
    color: "#F3C677",
    // #F3C677
  },
  textInputInput: {
    color: "#F3C677",
    // #F3C677
  },
  textInput2:{
    marginRight: '10px',
    marginLeft: "10px",
    color: "#7A4E79",
    width: "90%"
  },
  textInputInput2:{
    color: "#7A4E79",
    padding:"10px",
    width: "90%"
  },
  h4:{
    color: "#7A4E79",
  },
  paper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2CC8A',
    display: 'inline-block',
  },
  orangepaper:{
    height: "auto",
    width: "95%",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2A521',
    display: 'inline-block',
  },
  purplepaper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
  },
  dialog:{
    backgroundColor: "#7A5079",
    width: "100%",
    height: "100%"
  },
  dialogpurple:{
    width: "100%",
    height: "100%",
    backgroundColor: '#7A5079',
    padding: "10px"
  },
  select:{
    width: "80%",
    verticalAlign: "bottom"
  },
  checkbox:{
    width:"200px",
    height:"auto",
    fontSize:"15px",
    fontWeight:"bold",
    display:"inline-block",
    float:'left'
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

class CalendarPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDay: null,
      allDays: [],
      puppies: "puppies",
      goalsToday: "nogoals",
      openAddData: false,
      name: "",
      actionType: "",
      notes: "",
      dateSubmitted: "",
      dateDue: "",
      location: ""
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


  calendarAdd(e){
    e.preventDefault();

    var self = this;
    self.setState({openAddData: false})

    axios.post('http://localhost:5000/calendar/addgoal', {
      name: this.state.name,
      actionType: this.state.actionType,
      notes: this.state.notes,
      dateSubmitted: this.state.dateSubmitted,
      dateDue: this.state.dateDue,
      location: this.state.location
    })
      .then((response)=>{
        console.log("result from calendarAdd axios post is ", response)

        self.setState({
          name: '',
          actionType: '',
          notes: '',
          dateSubmitted: '',
          datedue: '',
          location: ''
        })

        self.getCalendarInfo();

      })
      .catch(function(error){
          console.error(error);
      });
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
                   {goal.name}
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
      listGoals = <Paper style={styles.orangepaper} zDepth={2}><p>You have nothing due today!</p></Paper>
    }

    const dialogActions = [
      <Button
         label={'close'}
         style={styles.button}
         onClick={(e)=>this.setState({openAddData: false})}
         primary={true}
       />,
       <Button
          label={'close'}
          style={styles.button}
          onClick={(e)=>this.setState({openAddData: false})}
          primary={true}
        />
    ];

    // <div className='calendarContainer'>
    //   <div className='calendar'>
  //   </div>
  // </div>

    const { selectedDay } = this.state;
        return (
          <div>

            <Paper style={styles.orangepaper} zDepth={2}>
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
              <br/>
              <Button
                 label={'add calendar item'}
                 style={styles.button}
                 onClick={(e)=>this.setState({openAddData: true})}
                 primary={true}
               />

            </Paper>

            <div className='calendarDetail'>
              <p>
                {selectedDay
                  ? selectedDay.toLocaleDateString()
                  : 'Please select a day'}
              </p>
            </div>

            <Dialog
               modal={true}
               bodyStyle={{
                  padding: '0px',
                  paddingTop: '0px',
                  textAlign: 'center',
                  backgroundColor: '#7A5079'
               }}
               open={this.state.openAddData}
             >


               <TextField
                 hintText="event name"
                 onChange={(e)=>this.setState({name: e.target.value })}
                 value={this.state.name}
                 style={styles.textInput}
                 inputStyle={styles.textInputInput}
               /><br/>
               <TextField
                 hintText="event type"
                 onChange={(e)=>this.setState({actionType: e.target.value })}
                 value={this.state.actionType}
                 style={styles.textInput}
                 inputStyle={styles.textInputInput}
               /><br/>
               <TextField
                 hintText="event date"
                 onChange={(e)=>this.setState({dateDue: e.target.value })}
                 value={this.state.dateDue}
                 style={styles.textInput}
                 inputStyle={styles.textInputInput}
               /><br/>
               <TextField
                 hintText="event location"
                 onChange={(e)=>this.setState({location: e.target.value })}
                 value={this.state.location}
                 style={styles.textInput}
                 inputStyle={styles.textInputInput}
               /><br/>
               <TextField
                 floatingLabelText="event notes"
                 onChange={(e)=>this.setState({notes: e.target.value })}
                 value={this.state.notes}
                 style={styles.textInput}
                 textareaStyle={styles.textInputInput}
                 multiLine={true}
                 rows={5}
                 /><br/>
               <Button
                  label={'add to calendar'}
                  style={styles.button}
                  onClick={(e)=>{
                    this.setState({
                      selectedDay:null,
                      goalsToday:"nogoals"
                    })
                    this.calendarAdd(e)}}
                  secondary={true}
                />
                 <Button
                    label={'close'}
                    style={styles.button}
                    onClick={(e)=>this.setState({openAddData: false})}
                    primary={true}
                  />
             </Dialog>


            <Paper style={styles.purplepaper} zDepth={2}>
                {listGoals}
            </Paper>

          </div>
        );
        }
}

export default CalendarPage;
