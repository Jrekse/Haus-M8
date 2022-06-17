import '../CSS/App.css';
import User from '../Data/UserData.js';

var user = []
var target

function OtherProfile() {

    return (
        <div className="profile">
            <div className='profileHeader'>
                <h1 className='profileTitle'>Profile</h1>
            </div>
            <div className='profileBox'>
                {user.map((users, index) => {
                    return(
                        <div className="profileList" id={index}>
                            <header className='profileName'><h3>{users.name}</h3></header>
                            <h4 className='profileDob'>{users.dob}</h4>
                            <h4 className='profileEmail'>{users.email}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
  
}

window.addEventListener('load', (event) => {

  target = localStorage.getItem("clickedProfile");

  for (var j = 0; j < User.length; j += 1) {

    if(target === User[j].uid){

        user.push({"name": User[j].uname, "dob": User[j].dob, 'email':User[j].email});

    }

  }

});

export default OtherProfile;