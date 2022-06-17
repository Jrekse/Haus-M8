import '../CSS/App.css';
import User from '../Data/UserData.js';
import Notes from '../Data/NoteData.js';
import Goals from '../Data/GoalData.js';
import Chores from '../Data/ChoreData.js';

var friends = []
var user = []
var currentUser
var housemates = localStorage.getItem('houseID')


var NoteArr = []
var Note
var GoalArr = []
var Goal
var ChoreArr = []
var Chore
var ChoreColor0
var GoalColor0

function Profile() {

    return (
        <div className="profile">
            <div className='profileHeader'>
                <h1 className='profileTitle'>Profile</h1>
            </div>
            <div className='profileBox'>
                
                <div className='previewCols'>

                    <div className='homePreviewLeft' id='Lprof'>

                        {user.map((users, index) => {
                            return(
                                <div className="profileList" id={index}>
                                    <header className='profileName'><h3>{users.name}</h3></header>
                                    <h4 className='profileDob'>{users.dob}</h4>
                                    <h4 className='profileEmail'>{users.email}</h4>
                                </div>
                            )
                        })}

                        <br/>
                        <hr/>
                        <br/>

                        
                        <h3>House Mates</h3>

                        {friends.map((users, index) => {
                            return(
                                <div className="profileList" key={index} id={users.uid}>
                                    <header className='FprofileName'><p onClick={()=>visitProfile(users.uid)}><u>{users.name}</u></p></header>
                                    <p className='profileDob'>{users.dob}</p>
                                    <p className='profileEmail'>{users.email}</p>
                                </div>
                            )
                        })}

                    </div>
                    
                    <div className='homePreviewRight' id='Rprof'>

          
                        <div className="NoteList" >
                            <header className='NoteTitle'><p>{Note.title}</p></header>
                            <p className='NoteBody'>{Note.content}</p>
                        </div>
                        <p className='hpSeeAll' onClick={openNotes}><u>See All Notes</u></p>

                        <div className="NoteList">
                            <header className='NoteTitle' style={GoalColor0}><p className='hpGoalTitle'>{Goal.title}</p><p className='hpGoalDueDate'>Due: {Goal.due}</p></header>
                            <p className='NoteBody'>{Goal.content}</p>
                        </div>
                        <p className='hpSeeAll'onClick={openGoals}><u>See All Goals</u></p>

                        <div className="NoteList">
                            <header className='NoteTitle' style={ChoreColor0}><p className='hpGoalTitle'>{Chore.title}</p><p className='hpGoalDueDate'>Due: {Chore.due}</p></header>
                            <p className='NoteBody'>{Chore.details}</p>
                        </div>
                        <p className='hpSeeAll' onClick={openChores}><u>See All Chores</u></p>

                    </div>
                </div>
            </div>
        </div>
    );
  
}

window.addEventListener('load', (event) => {

  currentUser = localStorage.getItem("currentUser");

  var gC = localStorage.getItem('GoalColor0');
  var gtC = localStorage.getItem('GoaltColor0')
  GoalColor0 = {backgroundColor: gC, color: gtC}

  var cC = localStorage.getItem('ChoreColor0');
  var ctC = localStorage.getItem('ChoretColor0');
  ChoreColor0 = {backgroundColor: cC, color: ctC}

  for (var j = 0; j < User.length; j += 1) {

    if(currentUser === User[j].uid){

        user.push({"name": User[j].uname, "dob": User[j].dob, 'email':User[j].email});

    }

  }

  for (var y = 0; y < User.length; y += 1) {

    if(housemates === User[y].houseID && currentUser !== User[y].uid){

      friends.push({"name": User[y].uname,"uid":User[y].uid});

    }

  }

  for (var b = 0; b < Notes.length; b += 1) {

    if(currentUser === Notes[b].userID){

      NoteArr.push(Notes[b])

      Note = NoteArr[0]

    } 

  }

  for (var k = 0; k < Goals.length; k += 1) {

    if(currentUser === Goals[k].userID){

      GoalArr.push(Goals[k])

      Goal = GoalArr[0]

    } 

  }

  for (var r = 0; r < Chores.length; r += 1) {

    if(currentUser === Chores[r].userID){

      ChoreArr.push(Chores[r])

      Chore = ChoreArr[0]

    } 

  }

});

function visitProfile(props){
    localStorage.setItem("clickedProfile", props)
    localStorage.setItem("activity", "VisitProfile");
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

export default Profile;