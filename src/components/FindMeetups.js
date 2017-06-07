

import React, { Component } from 'react';
import axios from 'axios';
import ListMeetup from './ListMeetup';

class FindMeetups extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerm: "",
      meetupArray: []
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
        meetupArray: response.data
      }, ()=>{
        console.log("meetupArray is.... ", self.state.meetupArray);
      });
    })
    .catch((error)=>{
      console.log('in searchmeetups catch.')
      console.log("the error is ", error);
    })

  }

  render() {

    let listMeetups;

    if(this.state.meetupArray.length!=0){
          listMeetups = this.state.meetupArray.map((meetup,i) => {
            return (
              <ListMeetup key={i} meetup={meetup}/>
            );
          });
    }
    if(this.state.meetupArray.length===0){
      listMeetups = <div><p>Search for Meetups to Show a List!</p></div>
    }


          return (
            <div>
              <p>FindMeetups</p>
              <form>
                <input
                        onChange={(e)=>this.setState({searchTerm: e.target.value })}
                        type="text"
                        name="searchTerm"
                        id="searchTerm"
                        placeholder="search term"/>
                <button onClick={(e)=>this.searchMeetups(e)}>Search!</button>
              </form>

              {listMeetups}
            </div>
          );
        }
}

export default FindMeetups;
