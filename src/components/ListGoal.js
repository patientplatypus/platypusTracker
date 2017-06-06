

import React, { Component } from 'react';
import axios from 'axios';
import ModifyGoal from './ModifyGoal';
import renderIf from 'render-if';

class ListGoal extends Component {
  constructor(props){
    super(props);

    this.state = {
      modify: false
    }
  }



  deleteItem(e){
    e.preventDefault();

        console.log('this.props.goal.id in deleteItem in ListGoal', this.props.goal.id);
        console.log('this.props.goal._id in deleteItem in ListGoal', this.props.goal._id);
// /deleteItem/:delete_id
    var self = this;
    var url = 'http://localhost:5000/calendar/deleteItem/' + this.props.goal._id;

    axios.delete(url)
      .then((response)=>{
        console.log('delete list item response is ', response);
        this.props.handleForceUpdate(self.props.goal.dateDue);
      })
      .catch(function(error){
        console.error(error);
      })

  }

  modifyItem(e){
    e.preventDefault();
    console.log("inside modifyItem");
    if (this.state.modify===false){
      this.setState({
        modify: true
      }, ()=>{
        console.log('after setstate for modify in modifyItem and value of this.state.modify is ', this.state.modify);
      })
    }else{
      this.setState({
        modify: false
      }, ()=>{
        console.log('after setstate for modify in modifyItem and value of this.state.modify is ', this.state.modify);
      })
    }
  }

  setModify(){
    this.setState({
      modify: false
    })
  }

  render() {

        const XModifyGoalx = () => {
          if (this.state.modify===true){
            console.log('inside xModifyGoalx and this.state.modify is true');
            return(
              <div>
                <ModifyGoal goal={this.props.goal} setModify={this.setModify.bind(this)} handleForceUpdate={this.props.handleForceUpdate.bind(this)}/>
              </div>
            )
          }else{
            console.log('inside xModifyGoalx and this.state.modify is false');
            return(
              <div></div>
            )
          }
        }

          return (
            <div>
              {renderIf(this.props.goal.actionType != "***email***")(
                <div className="GoalsDue">
                   <strong>{this.props.goal.name}</strong> - {this.props.goal.location} <p> {this.props.goal.notes} </p>
                   <button onClick={(e)=>this.deleteItem(e)}>Delete Item!</button>
                   <button onClick={(e)=>this.modifyItem(e)}>Change Item!</button>

                   <div className="modifygoalcontainer">
                       <XModifyGoalx/>
                   </div>
                 </div>
              )}
              {renderIf(this.props.goal.actionType === "***email***")(
                <div className="GoalsDue">
                  <h3>{this.props.goal.name}</h3>
                  <h4>Here is what you wrote:</h4>
                  <p>{this.props.goal.notes}</p>
                </div>
              )}
            </div>
          )
        }
}

export default ListGoal;
