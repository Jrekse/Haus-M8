import React, {Component} from 'react';
import './CSS/App.css';
import Login from './Models/Login.js';
import SignUp from './Models/SignUp.js';
import Home from './Models/Home.js';
import Nav from './Models/Nav.js';
import Goals from './Models/Goals.js';
import Notes from './Models/Notes.js';
import Chore from './Models/Chores.js'
import Profile from './Models/Profile.js';
import OtherProfile from './Models/OtherProfile.js';
import NewNote from './Models/NewNote.js';
import NewGoal from './Models/NewGoal.js';
import NewChore from './Models/NewChore.js';

//sets login value to variable to be used by state
var LoginStatus; 
var Activity;

class App extends Component {

  // Manages Global state vv
  state = {

    currentPage:LoginStatus

  };

  handlePageChange = page => {

    this.setState({ currentPage: page });

  };

  renderPage = () => {
    
    if (this.state.currentPage === "loggedIn") {

      // console.log(LoginStatus)
      
      if (Activity === 'Notes'){
        return <><Nav/><Notes/></>
      } else if (Activity === "Profile"){
        return <><Nav/><Profile/></>
      } else if (Activity === "VisitProfile"){
        return <><Nav/><OtherProfile/></>
      } else if (Activity === "Goals"){
        return <><Nav/><Goals/></>
      } else if (Activity === "Chore"){
        return <><Nav/><Chore/></>
      } else if (Activity === "NewNote"){
        return <><Nav/><NewNote/></>
      } else if (Activity === "NewGoal"){
        return <><Nav/><NewGoal/></>
      } else if (Activity === "NewChore"){
        return <><Nav/><NewChore/></>
      } else {
        return <><Nav/><Home/></>
      }


    } else if(this.state.currentPage === "signUp"){

      console.log(LoginStatus)
      return <SignUp/>

    } else {

      console.log(LoginStatus)
      return <Login/>;

    }

  };
  // Manages Global state ^^

  // renders front end vv
  render(){
    return (

      <div className="App">

         {this.renderPage()}
         
      </div>

    );
  }
  // renders front end ^^

}

// Checks Local Storage for state vv
window.addEventListener('load', (event) => {

  LoginStatus = localStorage.getItem("LoginStatus");

  Activity = localStorage.getItem("activity")

  if(Activity !== "VisitProfile"){
    localStorage.removeItem('clickedProfile')
  }


});
// Checks Local Storage for state ^^

export default App;
