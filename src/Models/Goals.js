import '../CSS/App.css';
import Goals from '../Data/GoalData.js';

var moment = require('moment');                     //Imports moment.js
var CurrentDate = moment().format("MM Do yyyy");   //Formats the moment.js current date
var currentUser;                                   //Holds current userID
var CurrentDateArr = CurrentDate.split(" ");          //Array for current date values
var currentDay = CurrentDateArr[1];               //Isolates the day value for current date
var userGoals = [];                             //Array of current user's Goals
var goalColor = [];                          //holds color values to be passed to render
var greenGoals = [];
var yellowGoals = [];
var redGoals = [];
var parsedGoalDayArr = [];                               //Holds all parsed due dates
var currentDayParsed;                                    //Parsed current day
var MinorGoalArr    

function Goal() {

    return (
        <div className="Goals">
            <div className='GoalsHeader'>
                <h1 className='GoalsTitle'>Goals</h1>
                <button id='newGoal' className='greenBtn' onClick={newGoal}>Create new Goal</button>
            </div>

            {greenGoals.map((gGoal, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle green'><p className='hpGoalTitle'>{gGoal.title}</p><p className='hpGoalDueDate'>Due: {gGoal.due}</p></header>
                        <p className='GoalBody'>{gGoal.content}</p>
                    </div>
                )
            })}
            
            {yellowGoals.map((yGoal, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle yellow'><p className='hpGoalTitle'>{yGoal.title}</p><p className='hpGoalDueDate'>Due: {yGoal.due}</p></header>
                        <p className='GoalBody'>{yGoal.content}</p>
                    </div>
                )
            })}

            {redGoals.map((rGoal, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle red'><p className='hpGoalTitle'>{rGoal.title}</p><p className='hpGoalDueDate'>Due: {rGoal.due}</p></header>
                        <p className='GoalBody'>{rGoal.content}</p>
                    </div>
                )
            })}


        </div>
    );
  
}

function newGoal(){
    localStorage.setItem("activity", "NewGoal");
    window.location.reload();
}

window.addEventListener('load', (event) => {

  currentUser = localStorage.getItem("currentUser");

    if(currentDay.length === 3){               //takes only day values between 1-9 (for comparing to the Goal due date)

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

    for (var i = 0; i < Goals.length; i += 1) {           //Loops through all Goals

        if(currentUser === Goals[i].userID){                                                                    

            userGoals.push({"title": Goals[i].title, "content": Goals[i].content, "due": Goals[i].due});     //Pushes all of the current user's Goals to new array

        } 

    }

    for (var j = 0; j < userGoals.length; j ++) {           //loops through current user's Goals

        MinorGoalArr = userGoals[j].due.split(' ') 

        if(MinorGoalArr[1].length === 3){              //takes only day values between 1-9

            var three = MinorGoalArr[1].split("")          //splits day value into characters
            var newThree = three[0]                         //reassigns to only the first value
            newThree = Number(newThree)                     //converts back to a number
            parsedGoalDayArr.push(newThree)                 //pushes number to array

        } else if (MinorGoalArr[1].length === 4){      //same as lines 89-92, but with day values 10-31

            var four = MinorGoalArr[1].split("")           
            var newFour = four[0] + four[1]                 
            newFour = Number(newFour)                       
            parsedGoalDayArr.push(newFour)    

        }                                               

    }

    for (var y = 0; y < parsedGoalDayArr.length; y ++) {          //loops through array of parsed due dates

        MinorGoalArr = userGoals[y].due.split(' ') 

        if(MinorGoalArr[2] === CurrentDateArr[2]){

            if(MinorGoalArr[0] === CurrentDateArr[0]){

                if(parsedGoalDayArr[y] === currentDayParsed){

                    goalColor.push({'id' : y , 'color' : 'green', 'textG' : 'black'})    //Sets color to yellow if the Goal is not due yet
                    greenGoals.push(userGoals[y])

                } else if (parsedGoalDayArr[y] > currentDayParsed){

                    goalColor.push({'id' : y , 'color' : 'yellow', 'textG' : 'black'})     //Sets color to green if the Goal is due today
                    yellowGoals.push(userGoals[y])

                } else if (parsedGoalDayArr[y] < currentDayParsed){

                    goalColor.push({'id' : y , 'color' : 'red'})       //Sets color to red if the Goal is passed due
                    redGoals.push(userGoals[y])

                }

            } else if (MinorGoalArr[0] > CurrentDateArr[0]){

                goalColor.push({'id' : y , 'color' : 'yellow', 'textG' : 'black'})     //Sets color to green if the Goal is due today
                yellowGoals.push(userGoals[y])

            } else if (MinorGoalArr[0] < CurrentDateArr[0]){

                goalColor.push({'id' : y , 'color' : 'red'})     //Sets color to green if the Goal is due today
                redGoals.push(userGoals[y])

            }

        } else if (MinorGoalArr[2] > CurrentDateArr[2]){

            goalColor.push({'id' : y , 'color' : 'yellow', 'textG' : 'black'})     //Sets color to green if the Goal is due today
            yellowGoals.push(userGoals[y])

        } else if (MinorGoalArr[2] < CurrentDateArr[2]){

            goalColor.push({'id' : y , 'color' : 'red'})     //Sets color to green if the Goal is due today
            redGoals.push(userGoals[y])

        }

        // console.log(goalColor[0])

    }

    localStorage.setItem('GoalColor0', goalColor[0].color)
    localStorage.setItem('GoaltColor0', goalColor[0].textG)

});

export default Goal;