

import React, { Component } from 'react';
import renderIf from 'render-if';
import Button from './Button';
import Paper from 'material-ui/Paper';


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
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2A521',
    display: 'inline-block',
  },
  purplepaper:{
    height: "auto",
    width: "60%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
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
        <Paper style={styles.purplepaper} zDepth={2}>
          <h4>{this.props.template.body}</h4>
          <Button
             label={'populate email'}
             style={styles.button}
             onClick={(e)=>this.handleSendToFormJob(e)}
             secondary={true}
           />
           <Button
              label={'delete template'}
              style={styles.button}
              onClick={(e)=>this.handleDeleteTemplate(e)}
              primary={true}
            />
        </Paper>
      );
    }else{
      console.log('inside DOES NOT hasOwnProperty jobTitle LISTTEMPLATE');
      return(
        <Paper style={styles.purplepaper} zDepth={2}>
          <h4>{this.props.template.body}</h4>
          <Button
             label={'populate email'}
             style={styles.button}
             onClick={(e)=>this.handleSendToFormJob(e)}
             secondary={true}
           />
           <Button
              label={'delete template'}
              style={styles.button}
              onClick={(e)=>this.handleDeleteTemplate(e)}
              primary={true}
            />
        </Paper>
      );
    }

  }
}

export default ListTemplate;
