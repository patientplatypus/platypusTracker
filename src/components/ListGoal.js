

import React, { Component } from 'react';


class ListGoal extends Component {
  constructor(props){
    super(props);

  }

  render() {
          return (
            <div className="GoalsDue">
              <strong>{this.props.goal.name}</strong> - {this.props.goal.location} - {this.props.goal.notes}
            </div>
          );
        }
}

export default ListGoal;
