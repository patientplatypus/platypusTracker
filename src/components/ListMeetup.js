

import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Button from './Button';
import renderIf from 'render-if';

const styles = {
  base: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
  },
  addtocalendar: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
    width: '50%'
  },
  textInput: {
    marginRight: '10px',
    color: '#F3C677',
  },
  textInputInput: {
    color: '#F3C677',
  },
  purplepaper:{
    height: "auto",
    width: "90%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
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
  }
};


class ListMeetup extends Component {
  constructor(props){
    super(props);
    this.state={
      datentime: "",
      renderlocation: false,
      datestring: "",
    }
  }

  componentWillMount(){
    var self = this;
    var utcSeconds = this.props.meetup.time;
    var targetDate = new Date(utcSeconds);
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = targetDate.getFullYear();
    var hh = targetDate.getHours();
    var mi = targetDate.getMinutes();
    var datestring = mm + "/" + dd + "/" + yyyy;
    var datentime = datestring + ' at ' + hh + ":" + mi;
    this.setState({
      datentime: datentime,
      datestring: datestring
    })

    if(this.props.meetup.hasOwnProperty('venue')){
        this.setState({
          renderlocation: true
        })
    }
  }
// <h4>{this.props.meetup.venue.address_1}</h4>

  calendarAdd(e){
    e.preventDefault();

    var self = this;
    var location;
    if(this.state.renderlocation){
      location = this.props.meetup.venue.address_1;
    }else{
      location = "no location available";
    }

    axios.post('http://localhost:5000/calendar/addgoal', {
      name: this.props.meetup.name,
      actionType: "***meetup***",
      notes: this.props.meetup.description,
      dateDue: this.state.datestring,
      location: location
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

      })
      .catch(function(error){
          console.error(error);
      });
  }

  // {renderIf(typeof this.props.meetup.venue != 'null')(
  //   <h4>Location: {this.props.meetup.venue.address_1}</h4>
  // )}

  render() {

          const LocationDisplay = ()=>{
            if(this.state.renderlocation){
              return <h4>Location: {this.props.meetup.venue.address_1}</h4>
            }else{
              return <div></div>
            }
          }



          return (
            <Paper style={styles.purplepaper} zDepth={2}>
              <div>
                <br/>
                <strong>{this.props.meetup.name}</strong>
                <h4>{this.state.datentime}</h4>
                <LocationDisplay/>
                <div className="content" dangerouslySetInnerHTML={{__html: this.props.meetup.description}}></div>
                <Button
                  label={'add to calendar'}
                  style={styles.addtocalendar}
                  primary={false}
                  secondary={true}
                  onClick={(e)=>this.calendarAdd(e)}
                />
              </div>
            </Paper>
          );
        }
}

export default ListMeetup;
