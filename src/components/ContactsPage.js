

import React, { Component } from 'react';
import axios from 'axios';
import ListContact from './ListContact';


class ContactsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      linkedIn: "",
      profilePic: "",
      email: "",
      phone: "",
      github: "",
      notes: "",
      contactResults: [],
      searchTerm: ""
    }
  }

  componentWillMount() {
    var self = this;
      axios.post('http://localhost:5000/contacts/allcontactinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((contact)=>{
              tempObj = {};
              tempObj.name = contact.name;
              tempObj.linkedIn = contact.linkedIn;
              tempObj.profilePic = contact.profilePic;
              tempObj.email = contact.email;
              tempObj.phone = contact.phone;
              tempObj.github = contact.github;
              tempObj.notes = contact.notes;

              arryAll.push(tempObj);
            });
            self.setState({
              contactResults: arryAll
            });
          });
  }

  getContactsInfo(){
    var self = this;
      axios.post('http://localhost:5000/contacts/allcontactinfo')
        .then((response)=>{
            var arryAll = [];
            var tempObj = {};

            response.data.forEach((contact)=>{
              tempObj = {};
              tempObj.name = contact.name;
              tempObj.linkedIn = contact.linkedIn;
              tempObj.profilePic = contact.profilePic;
              tempObj.email = contact.email;
              tempObj.phone = contact.phone;
              tempObj.github = contact.github;
              tempObj.notes = contact.notes;

              arryAll.push(tempObj);
            });
            self.setState({
              contactResults: arryAll
            });
          });
     this.forceUpdate();
  }




  contactAdd(e){
    e.preventDefault();
    var self = this;
    axios.post('http://localhost:5000/contacts/addcontact', {
      linkedIn: this.state.linkedIn,
      name: this.state.name,
      profilePic: this.state.profilePic,
      email: this.state.email,
      phone: this.state.phone,
      github: this.state.github,
      notes: this.state.notes
    })
      .then((response)=>{
        console.log("result from contactAdd axios post is ", response)
        self.getContactsInfo();
      })
      .catch(function(error){
          console.error(error);
      });
  }


  render() {

    let listContacts;

    if(this.state.searchTerm===""){
      if(this.state.contactResults.length!=0){

          // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
              listContacts = this.state.contactResults.map((contact,i) => {
                return (
                  <ListContact key={i} contact={contact}/>
                );
              });
        }

        if(this.state.contactResults.length===0){
          // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
          listContacts = <div><p>Add contacts to populate!</p></div>
        }
    }else{
      if(this.state.contactResults.length!=0){
        console.log("this.state.contactResults ", this.state.contactResults);

        listContacts = this.state.contactResults.map((contact,i)=>{

          console.log("contact.name ", contact.name);
          var displayItem = false;

          for(var y=0; y<this.state.searchTerm.length; y++){
            if(y<contact.name.length){
              if(this.state.searchTerm[y]===contact.name[y]){
                displayItem = true;
              }else{
                displayItem = false;
              }
            }else{
              displayItem = false;
            }
          }


          // var filteredNames = contact.name.filter((el)=>{
          //   el.toLowerCase().indexOf(this.state.searchTerm.toLowerCase())>-1
          // });

          if (displayItem === true){
            console.log('inside displayItem true');
            return(
              <ListContact key={i} contact={contact}/>
            );
          }

        });


        // var filteredNames = this.state.contactResults.name.filter((el) =>
        //   el.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
        // )
        //
        // for(var x=0; x<this.state.contactResults.length; x++){
        //   for(var y=0; y<filteredNames.length; y++){
        //     if (this.state.contactResults[x].name === filteredNames[y]){
        //       <ListContact key={x} contact={this.state.contactResults[x]}/>
        //     }
        //   }
        // }

      }

      if(this.state.contactResults.length===0){
        // console.log("this.state.goalsToday if is (second condition)", this.state.goalsToday);
        listContacts = <div><p>Add contacts to populate!</p></div>
      }
    }

          return (
            <div className='contactsPageContainer'>
              <h1>Contacts</h1>
              <h3>Add Contact!</h3>
              <div className="addForm Container">
                <form>
                  <input
                          onChange={(e)=>this.setState({name: e.target.value })}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="name"/>
                  <input
                          onChange={(e)=>this.setState({profilePic: e.target.value })}
                          type="text"
                          name="profilePic"
                          id="profilePic"
                          placeholder="profilePic"/>
                  <input
                          onChange={(e)=>this.setState({linkedIn: e.target.value })}
                          type="text"
                          name="linkedIn"
                          id="linkedIn"
                          placeholder="linkedIn"/>
                  <input
                          onChange={(e)=>this.setState({email: e.target.value })}
                          type="text"
                          name="email"
                          id="email"
                          placeholder="email"/>
                  <input
                          onChange={(e)=>this.setState({phone: e.target.value })}
                          type="text"
                          name="phone"
                          id="phone"
                          placeholder="phone"/>
                  <input
                          onChange={(e)=>this.setState({github: e.target.value })}
                          type="text"
                          name="github"
                          id="github"
                          placeholder="github"/>
                  <textarea rows="4" cols="50"
                          onChange={(e)=>this.setState({notes: e.target.value })}
                          name="notes"
                          id="notes"
                          placeholder="notes"
                  ></textarea>
                  <button onClick={(e)=>this.contactAdd(e)}>Add Contact!</button>

                    <br/>
                    <hr/>

                      <input
                              onChange={(e)=>this.setState({searchTerm: e.target.value })}
                              type="text"
                              name="searchTerm"
                              id="searchTerm"
                              placeholder="search contacts"/>

                </form>
              </div>



              <div className='contactsContainer'>
                {listContacts}
              </div>

            </div>
          );
        }
}

export default ContactsPage;
