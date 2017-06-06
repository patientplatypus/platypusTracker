

import React, { Component } from 'react';




// linkedIn: this.state.linkedIn,
// name: this.state.name,
// profilePic: this.state.profilePic,
// email: this.state.email,
// phone: this.state.phone,
// github: this.state.github,
// notes: this.state.notes

// sendSavedContacttoEmail


class ListContact extends Component {

  handleSendContacttoEmail(e){
    e.preventDefault();
    // debugger;
    this.props.sendSavedContacttoEmail(this.props.contact);
  }


  render() {
          return (
            <div className="contactItem">
              <h4><strong>{this.props.contact.name}</strong></h4>
              <p>{this.props.contact.linkedIn}</p>
              <p>{this.props.contact.email}</p>
              <p>{this.props.contact.phone}</p>
              <p>{this.props.contact.github}</p>
              <p>{this.props.contact.notes}</p>
              <button onClick={(e)=>this.handleSendContacttoEmail(e)}>Email this contact!</button>
            </div>
          );
        }
}

export default ListContact;
