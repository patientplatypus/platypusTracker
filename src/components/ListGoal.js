

import React, { Component } from 'react';
import axios from 'axios';
import ModifyGoal from './ModifyGoal';
import renderIf from 'render-if';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from './Button';



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
    width: "95%",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2A521',
    display: 'inline-block',
  },
  purplepaper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
  },
  dialog:{
    backgroundColor: "#7A5079",
    width: "100%",
    height: "100%"
  },
  dialogpurple:{
    width: "100%",
    height: "100%",
    backgroundColor: '#7A5079',
    padding: "10px"
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
  },
  modify:{
    display: "inline"
  }
};




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
              {renderIf((this.props.goal.actionType != "***email***")&&(this.props.goal.actionType !="***meetup***"))(
                <Paper style={styles.orangepaper} zDepth={2}>
                   <strong>{this.props.goal.name}</strong> - {this.props.goal.location} <p> {this.props.goal.notes} </p>

                   <Button
                      label={'delete'}
                      style={styles.button}
                      onClick={(e)=>this.deleteItem(e)}
                      secondary={true}
                    />

                    {renderIf(!this.state.modify)(
                      <div style={styles.modify}>
                      <Button
                         label={'modify'}
                         style={styles.button}
                         onClick={(e)=>this.modifyItem(e)}
                         primary={true}
                       />
                       <br/>
                       </div>
                    )}
                    {renderIf(this.state.modify)(
                      <div style={styles.modify}>
                      <Button
                         label={'close modify'}
                         style={styles.button}
                         onClick={(e)=>this.modifyItem(e)}
                         primary={true}
                       />
                       <br/>
                       </div>
                    )}

                   <Paper style={styles.purplepaper} zDepth={2}>
                       <XModifyGoalx/>
                   </Paper>
                 </Paper>
              )}
              {renderIf(this.props.goal.actionType === "***email***")(
                <Paper style={styles.orangepaper} zDepth={2}>
                  <h3>{this.props.goal.name}</h3>
                  <h4>Here is what you wrote:</h4>
                  <p>{this.props.goal.notes}</p>
                  <Button
                     label={'delete'}
                     style={styles.button}
                     onClick={(e)=>this.deleteItem(e)}
                     secondary={true}
                   />
                </Paper>
              )}
              {renderIf(this.props.goal.actionType === "***meetup***")(
                <Paper style={styles.orangepaper} zDepth={2}>
                  <h3>{this.props.goal.name}</h3>
                  <h4>Location: {this.props.goal.location}</h4>
                  <div className="content" dangerouslySetInnerHTML={{__html: this.props.goal.notes}}></div>
                  <Button
                     label={'delete'}
                     style={styles.button}
                     onClick={(e)=>this.deleteItem(e)}
                     secondary={true}
                   />
                </Paper>
              )}
            </div>
          )
        }
}

export default ListGoal;
