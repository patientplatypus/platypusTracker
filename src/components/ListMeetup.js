

import React, { Component } from 'react';
import axios from 'axios';

class ListMeetup extends Component {
  constructor(props){
    super(props);
    this.state={
      datentime: "",
      datestring: "",
    }
  }

  componentWillMount(){
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
  }
// <h4>{this.props.meetup.venue.address_1}</h4>

  calendarAdd(e){
    e.preventDefault();

    var self = this;

    axios.post('http://localhost:5000/calendar/addgoal', {
      name: this.props.meetup.name,
      actionType: "***meetup***",
      notes: this.props.meetup.description,
      dateDue: this.state.datestring,
      // location: this.state.location
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


  render() {
    //
    // const XDescriptionx = ()=>{
    //   var description = this.props.meetup.description;
    //   return(
    //     <div>
    //         <div dangerouslySetInnerHTML={__html: description} />
    //     </div>
    //   )
    // }


          return (
            <div>
              <strong>{this.props.meetup.name}</strong>

              <h4>{this.state.datentime}</h4>
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.meetup.description}}></div>
            <button onClick={(e)=>this.calendarAdd(e)}>Add to Calendar!</button>
            </div>
          );
        }
}

export default ListMeetup;
