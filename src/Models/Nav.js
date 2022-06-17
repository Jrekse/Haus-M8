import '../CSS/App.css';
import Users from '../Data/UserData.js';
import ProfileImg from '../Data/profileDefault.png'
import SettingImg from '../Data/Settings-icon.png'

var currentUser;
var uname
var email


function nav() {

  return (
    <div className="Nav">

        <div className='profCard'>
          <img className='cardImg' src={ProfileImg} alt='Profile'/>
          <div className='cardBody'>
            <p className='usernameNav' id='NavLogoutBtn'>{uname}</p>
            <p className='emailNav' id='NavLogoutBtn'>{email}</p>
          </div>
          <br/>
          <p className='profileLink' onClick={openProfile} ><u>Go to Profile</u></p>
        </div>

        <img className='settingImg' src={SettingImg} alt='Settings'/>

        <div className='menu' >
          <div className='buttons'>
            <button className='greenBtn' id='Homebtn' onClick={Home}>Home</button>
            <button className='greenBtn' id='Goalsbtn' onClick={openGoals}>Goals</button>
            <button className='greenBtn' id='Notesbtn' onClick={openNotes}>Notes</button>
            <button className='greenBtn' id='Choresbtn' onClick={openChores}>Chores</button>
            <button className='redBtn' id='NavLogoutBtn' onClick={logOut}>Logout</button>
          </div>
        </div>

    </div>
  );

}

window.addEventListener('load', (event) => {

  currentUser = localStorage.getItem("currentUser");

  for (var i = 0; i < Users.length; i += 1) {

    if(currentUser === Users[i].uid){

      uname = Users[i].uname
      email = Users[i].email

    } 

  }

})

function openProfile(){
  localStorage.setItem("activity", "Profile");
  window.location.reload();
}

function openNotes(){
  localStorage.setItem("activity", "Notes");
  window.location.reload();
}

function openGoals(){
  localStorage.setItem("activity", "Goals");
  window.location.reload();
}

function openChores(){
  localStorage.setItem("activity", "Chore");
  window.location.reload();
}

function Home(){
  localStorage.setItem("activity", "Home");
  window.location.reload();
}

function logOut(){

  localStorage.clear();
  window.location.reload();

}

export default nav;