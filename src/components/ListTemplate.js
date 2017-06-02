

import React, { Component } from 'react';
import renderIf from 'render-if';

class ListTemplate extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }



  handleSendToForm(e){
    e.preventDefault();
    console.log('inside handleSendToForm');
    this.props.sendTemplatetoEmailForm(this.props.template.body);
  }

  handleSendToFormJob(e){
    e.preventDefault();
    console.log('inside handleSendToFormJob');
    this.props.sendTemplatetoEmailFormJob(this.props.template.body, this.props.savedJobtoEmail);
  }

  handleDeleteTemplate(e){
    e.preventDefault();
    this.props.deleteTemplate(this.props.template);
  }



  render() {

    if (this.props.savedJobtoEmail.hasOwnProperty('jobTitle')){
      console.log('inside hasOwnProperty jobTitle LISTTEMPLATE');
      return(
        <div>
          <h3>Template (this.props.savedJobtoEmail)~</h3>
          <h4>{this.props.template.body}</h4>
          <button onClick={(e)=>this.handleSendToFormJob(e)}> Populate Email Form!</button>
          <button onClick={(e)=>this.handleDeleteTemplate(e)}> Delete Template!</button>

        </div>
      );
    }else{
      console.log('inside DOES NOT hasOwnProperty jobTitle LISTTEMPLATE');
      return(
        <div>
          <h3>Template (this.props.savedJobtoEmail undefined)</h3>
          <h4>{this.props.template.body}</h4>
          <button onClick={(e)=>this.handleSendToForm(e)}> Populate Email Form!</button>
          <button onClick={(e)=>this.handleDeleteTemplate(e)}> Delete Template!</button>

        </div>
      );
    }

  }
}

export default ListTemplate;
