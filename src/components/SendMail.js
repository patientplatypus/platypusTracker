

import React, { Component } from 'react';
import axios from 'axios';
import renderIf from 'render-if';

class SendMail extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      text: "",
      subject: "",
      receiver: ""
    }
    var self = this;
  }

  // savedJobtoEmail

  componentWillMount() {
    console.log('inside componentWillMount of SendMail and the value of this.props.savedJobtoEmail is ', this.props.savedJobtoEmail);
  }


  sendMyEmail(e){
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    var text = this.state.text;
    var subject = this.state.subject;
    var receiver = this.state.receiver;
    this.setState({
      username: "",
      password: "",
      text: "",
      subject: "",
      receiver: ""
    })
      axios.post('http://localhost:5000/email/sendemail',{
        username: username,
        password: password,
        text: text,
        subject: subject,
        receiver: receiver
      })
      .then((response)=>{
        console.log("response from sending email ", response);
      })
  }

  render() {
          return (
            <div>
              <h1>Send Mail!</h1>

              <form>
                <input
                        onChange={(e)=>this.setState({username: e.target.value })}
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.username}
                        placeholder="username"/>
                <input
                        onChange={(e)=>this.setState({password: e.target.value })}
                        type="text"
                        name="password"
                        id="password"
                        value={this.state.password}
                        placeholder="password"/>
                <input
                        onChange={(e)=>this.setState({receiver: e.target.value })}
                        type="text"
                        name="receiver"
                        id="receiver"
                        value={this.state.receiver}
                        placeholder="receiver"/>
                <input
                        onChange={(e)=>this.setState({subject: e.target.value })}
                        type="text"
                        name="subject"
                        id="subject"
                        value={this.state.subject}
                        placeholder="subject"/>
                <textarea rows="4" cols="50"
                        onChange={(e)=>this.setState({text: e.target.value })}
                        name="text"
                        id="text"
                        value={this.state.text}
                        placeholder="text"
                ></textarea>
                <button onClick={(e)=>this.sendMyEmail(e)}>Send Email!</button>
              </form>

              {renderIf(this.props.savedJobtoEmail.hasOwnProperty("jobTitle"))(
                <div className='jobListing'>
                  <h2>This saved Job was sent to email!</h2>
                  <h3><strong>{this.props.savedJobtoEmail.jobTitle}</strong></h3>
                  <h4>{this.props.savedJobtoEmail.jobLink}</h4>
                  <h4>{this.props.savedJobtoEmail.companyName}</h4>
                  <h4>{this.props.savedJobtoEmail.jobLocation}</h4>
                  <h4>{this.props.savedJobtoEmail.jobDescription}</h4>
                  <h3>job status: {this.props.savedJobtoEmail.jobStatus}</h3>
                </div>
              )}


            </div>
          );
        }
}

export default SendMail;
