

import React, { Component } from 'react';
import axios from 'axios';


class AddData extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      actionType: "",
      notes: "",
      dateSubmitted: "",
      dateDue: "",
      location: ""
    }
  }





  calendarAdd(e){
    e.preventDefault();

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
      })
      .catch(function(error){
          console.error(error);
      });
  }



  render() {
          return (
            <div>
              <h1>Add Data</h1>
              <h3>Submit Calendar Items!</h3>
              <form>
                <input
                        onChange={(e)=>this.setState({name: e.target.value })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name"/>
                <input
                        onChange={(e)=>this.setState({actionType: e.target.value })}
                        type="text"
                        name="actionType"
                        id="actionType"
                        placeholder="actionType"/>
                <textarea rows="4" cols="50"
                        onChange={(e)=>this.setState({notes: e.target.value })}
                        name="notes"
                        id="notes"
                        placeholder="notes"
                ></textarea>
                <input
                        onChange={(e)=>this.setState({dateSubmitted: e.target.value })}
                        type="text"
                        name="dateSubmitted"
                        id="dateSubmitted"
                        placeholder="dateSubmitted"/>
                <input
                        onChange={(e)=>this.setState({dateDue: e.target.value })}
                        type="text"
                        name="dateDue"
                        id="dateDue"
                        placeholder="dateDue"/>
                <input
                        onChange={(e)=>this.setState({location: e.target.value })}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="location"/>
                <button onClick={(e)=>this.calendarAdd(e)}>Add Goal!</button>
              </form>
            </div>
          );
        }
}

export default AddData;
