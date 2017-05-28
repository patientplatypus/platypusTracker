

import React, { Component } from 'react';
import axios from 'axios';


class ModifyGoal extends Component {
  constructor(props){
    super(props);

    this.state = {
      goal: this.props.goal,
      name: '',
      location: '',
      notes: ''
    }
  }

  calendarModify(e){
    e.preventDefault();

    var self = this;

    axios.patch('http://localhost:5000/calendar/modifygoal', {
      id: this.state.goal._id,
      name: this.state.name,
      notes: this.state.notes,
      location: this.state.location
    })
      .then((response)=>{
        console.log("result from calendarModify axios post is ", response)
        this.props.handleForceUpdate(self.props.goal.dateDue);
        this.props.setModify();
      })
      .catch(function(error){
          console.error(error);
      });
  }


  render() {
          return (
            <div>

              <p>Update Item</p>
              <form>
                <input
                        onChange={(e)=>this.setState({name: e.target.value })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name"/>
                <input
                        onChange={(e)=>this.setState({location: e.target.value })}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="location"/>
                <textarea rows="4" cols="50"
                        onChange={(e)=>this.setState({notes: e.target.value })}
                        name="notes"
                        id="notes"
                        placeholder="notes"></textarea>
                <button onClick={(e)=>this.calendarModify(e)}>Modify!</button>
              </form>

            </div>
          );
        }
}

export default ModifyGoal;
