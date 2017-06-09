

import React, { Component } from 'react';
import axios from 'axios';
import ListMeetup from './ListMeetup';
import TextField from 'material-ui/TextField';
import Button from './Button';
import renderIf from 'render-if';
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
    //not totally sure how to change colors SADPANDA
    // backgroundColor: '#F3C677',
    // labelColor: '#7B1E7A'
  },
  textInput: {
    marginRight: '10px',
    color: '#F3C677',
  },
  textInputInput: {
    color: '#F3C677',
  },
  purplepaper:{
    height: "auto",
    width: "auto",
    paddingLeft: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "20px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#7A5079',
    display: 'inline-block',
  },
  paper:{
    height: "auto",
    width: "80%",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#F2DCB5',
    display: 'inline-block',
  }
};





class FindMeetups extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerm: "",
      meetupArray: [],
      searched: false
    }
  }

  searchMeetups(e){
    e.preventDefault();
    var self = this;


    axios.post('http://localhost:5000/meetups/search',{
      searchTerm: this.state.searchTerm
    })
    .then((response)=>{
      console.log('response from searchmeetups is ', response);
      self.setState({
        meetupArray: response.data,
        searched: true
      }, ()=>{
        console.log("meetupArray is.... ", self.state.meetupArray);
      });
    })
    .catch((error)=>{
      console.log('in searchmeetups catch.')
      console.log("the error is ", error);
    })

  }
  // <form>
  //   <input
  //           onChange={(e)=>this.setState({searchTerm: e.target.value })}
  //           type="text"
  //           name="searchTerm"
  //           id="searchTerm"
  //           placeholder="search term"/>
  //   <button onClick={(e)=>this.searchMeetups(e)}>Search!</button>
  // </form>

  render() {

    let listMeetups;

    if(this.state.meetupArray.length!=0){
          listMeetups = this.state.meetupArray.map((meetup,i) => {
            return (
              <ListMeetup key={i} meetup={meetup}/>
            );
          });
    }



          return (
            <div>
            <Paper style={styles.purplepaper} zDepth={2}>
              <TextField
                hintText="keyword search"
                onChange={(e)=>this.setState({searchTerm: e.target.value })}
                style={styles.textInput}
                inputStyle={styles.textInputInput}
              />
              <Button
                 label={'search'}
                 style={styles.button}
                 onClick={(e)=>this.searchMeetups(e)}
                 primary={true}
               />
             </Paper>
             <br/>
               {renderIf((this.state.searched === true)&&(this.state.meetupArray.length===0))(
                 <Paper style={styles.paper} zDepth={2}>
                   <div>
                     <strong>Sorry, but unfortunately your search term did not return any results</strong>
                     <p>Search Again!</p>
                   </div>
                 </Paper>
               )}

               {renderIf((this.state.searched === false))(
                 <Paper style={styles.paper} zDepth={2}>
                   <div>
                     <strong>Search to display local meetups</strong>
                   </div>
                 </Paper>
               )}

               <Paper style={styles.paper} zDepth={2}>
                {listMeetups}
               </Paper>
            </div>
          );
        }
}

export default FindMeetups;
