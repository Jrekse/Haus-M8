import '../CSS/App.css';
import User from '../Data/UserData.js';
import Notes from '../Data/NoteData.js';
import HouseData from '../Data/Houses.js';

var currentUser;
var FinishedHousem8s = []
var thisArr = [];
var fOne = []
var fTwo = []
var fThree = []
var fFour = []
var allFs = [fOne, fTwo, fThree, fFour]
var hhChores = []
var hAnn = []

var moment = require('moment');                     //Imports moment.js
var CurrentDate = moment().format("MM Do yyyy"); 
var CurrentDateArr = CurrentDate.split(" ");          //Array for current date values
var currentDay = CurrentDateArr[1];     
var currentDayParsed
var MinorChoreArr      
var parsedChoreDayArr = [];  

function Home() {

  return (
    <div className="Home">
      <div className='homeHeader'>
        <h1 className='homeUName'>Dashboard</h1>
      </div>
      <div className='previewCols'>
        <div className='homePreviewLeft'>
          <h3>House Announcements</h3>

          {hAnn.map((houseAnns, index) => {
            return(
              <div className="GoalList" key={index}>
                  <header id={index} className='GoalTitle red'><p className='hpGoalTitle'>{houseAnns.title}</p><p className='hpGoalDueDate'>Posted: {houseAnns.due}</p></header>
                  <p className='GoalBody'>{houseAnns.content}</p>
              </div>
            )
          })}

          <h3>House Chores</h3>

          {hhChores.map((houseChores, index) => {
            return(
              <div className="GoalList" key={index}>
                  <header id={index} className={houseChores.class}><p className='hpGoalTitle'>{houseChores.title}</p><p className='hpGoalDueDate'>Due: {houseChores.due}</p></header>
                  <p className='GoalBody'>{houseChores.content}</p>
              </div>
            )
          })}

        </div>
        <div className='homePreviewRight'>
          <h3>House Activity</h3>

          {FinishedHousem8s.map((otherPeople, index) => {
            return(
              <>
                <p key={index} onClick={()=>visitProfile(otherPeople.uid)}><u>{otherPeople.name}</u></p>
                {allFs[index].map((otherNote, indeks) => {
                  return(
                      <div className='joe' key={indeks}>
                        <header className='otherNoteTitle'><p id='ching'>{otherNote.they.title}</p></header>
                        <p className='NoteBody'>{otherNote.they.content}</p>
                      </div>
                  )
                })}
              </>
            )
          })}

        </div>
      </div>
    </div>
  );
  
}

function visitProfile(props){
  localStorage.setItem("clickedProfile", props)
  localStorage.setItem("activity", "VisitProfile");
  window.location.reload();
}

window.addEventListener('load', () => {

  currentUser = localStorage.getItem("currentUser");
  
  var HID = localStorage.getItem('houseID')

  if(currentDay.length === 3){               //takes only day values between 1-9 (for comparing to the chore due date)

    var currentDayArrThree = currentDay.split("")       //splits day value into characters
    var currentDayOneNum = currentDayArrThree[0]             //reassigns to only the first value
    currentDayOneNum = Number(currentDayOneNum)         //converts back to a number
    currentDayParsed = currentDayOneNum                     //pushes number to variable

  } else if (currentDay.length === 4){       //same as lines 65-58, but with day values 10-31

    var currentDayArrFour = currentDay.split("")
    var currentDayTwoNum = currentDayArrFour[0] + currentDayArrFour[1]
    currentDayTwoNum = Number(currentDayTwoNum)
    currentDayParsed = currentDayTwoNum

  }

  for (var a = 0; a < HouseData[HID].hChores.length; a ++) {           //loops through current user's chores

    MinorChoreArr = HouseData[a].hChores[a].due.split(' ') 

    if(MinorChoreArr[1].length === 3){              //takes only day values between 1-9

        var three = MinorChoreArr[1].split("")          //splits day value into characters
        var newThree = three[0]                         //reassigns to only the first value
        newThree = Number(newThree)                     //converts back to a number
        parsedChoreDayArr.push(newThree)                 //pushes number to array

    } else if (MinorChoreArr[1].length === 4){      //same as lines 89-92, but with day values 10-31

        var four = MinorChoreArr[1].split("")           
        var newFour = four[0] + four[1]                 
        newFour = Number(newFour)                       
        parsedChoreDayArr.push(newFour)                               

    }                                               

  }

  for (var r = 0; r < HouseData.length; r += 1) {
    if(HID === HouseData[r].hID){
      for (var f = 0; f < HouseData[r].hChores.length; f += 1) {

        MinorChoreArr = HouseData[r].hChores[f].due.split(' ') 
        currentDayParsed = currentDayParsed.toString(); 

        console.log(MinorChoreArr)

        if(MinorChoreArr[2] === CurrentDateArr[2]){

            if(MinorChoreArr[0] === CurrentDateArr[0]){

                if(parsedChoreDayArr[r] === currentDayParsed){

                  hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle green'})

                } else if (parsedChoreDayArr[r] > currentDayParsed){

                  hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle yellow'})

                } else if (parsedChoreDayArr[r] < currentDayParsed){

                  hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle red'})

                }

            } else if (MinorChoreArr[0] > CurrentDateArr[0]){

              hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle yellow'})

            } else if (MinorChoreArr[0] < CurrentDateArr[0]){

              hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle red'})

            }

        } else if (MinorChoreArr[2] > CurrentDateArr[2]){

          hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle yellow'})

        } else if (MinorChoreArr[2] < CurrentDateArr[2]){

          hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due, 'class' : 'GoalTitle red'})

        }

        // hhChores.push({"title": HouseData[r].hChores[f].title, "content": HouseData[r].hChores[f].details, "due": HouseData[r].hChores[f].due})

      }
      for (var c = 0; c < HouseData[r].hAnnouncements.length; c += 1) {

        hAnn.push({"title": HouseData[r].hAnnouncements[c].title, "content": HouseData[r].hAnnouncements[c].details, "due": HouseData[r].hAnnouncements[c].posted})

      }
    }
  }

  for (var g = 0; g < User.length; g += 1) {
    if(currentUser === User[g].uid){
      localStorage.setItem('houseID', User[g].houseID)
    }
  }

  for (var y = 0; y < User.length; y += 1) {
    if(HID === User[y].houseID && currentUser !== User[y].uid){
      FinishedHousem8s.push({"name": User[y].uname,"uid":User[y].uid, 'hid':User[y].houseID});
    }
  }

  for (var q = 0; q < Notes.length; q ++) {
    for (var h = 0; h < FinishedHousem8s.length; h ++) {
      var they
      if(Notes[q].userID === FinishedHousem8s[h].uid){        
        they = {'title':Notes[q].title,"content":Notes[q].content}
        thisArr.push({'id':Notes[q].userID, they})
      }
    }
  }

  for (var j = 0; j < thisArr.length; j ++) {
    if(thisArr[j].id === FinishedHousem8s[0].uid){
      fOne.push(thisArr[j])
    } else if (thisArr[j].id === FinishedHousem8s[1].uid){
      fTwo.push(thisArr[j])
    } else if (thisArr[j].id === FinishedHousem8s[2].uid){
      fThree.push(thisArr[j])
    } else if (thisArr[j].id === FinishedHousem8s[3].uid){
      fFour.push(thisArr[j])
    }
  }

  
  console.log(currentDayParsed.toString())

});

export default Home;