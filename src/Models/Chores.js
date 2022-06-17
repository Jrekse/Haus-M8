import '../CSS/App.css';
import Chores from '../Data/ChoreData.js';

var moment = require('moment');                     //Imports moment.js
var CurrentDate = moment().format("MM Do yyyy");   //Formats the moment.js current date
var currentUser;                                   //Holds current userID
var CurrentDateArr = CurrentDate.split(" ");          //Array for current date values
var currentDay = CurrentDateArr[1];               //Isolates the day value for current date
var userChores = [];                             //Array of current user's chores

var choreColor = [];                          //holds color values to be passed to render
var greenChores = [];
var yellowChores = [];
var redChores = [];

var parsedChoreDayArr = [];                               //Holds all parsed due dates
var currentDayParsed;                                    //Parsed current day
var MinorChoreArr                                    //cuts due date into month, day, and year values. assigns to array

// ---------------------------------------------------------------------------------------------^^IMPORTS+VARIABLES^^---------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------vvRENDERvv---------------------------------------------------------------------------------------------

function Chore() {

    return (

        <div className="Chores">

            <div className='GoalsHeader'>

                <h1 className='GoalsTitle'>Chores</h1>
                <button id='newGoal' className='greenBtn' onClick={newChore}>Create new Chore</button>

            </div>
            {greenChores.map((gChore, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle green'><p className='hpGoalTitle'>{gChore.title}</p><p className='hpGoalDueDate'>Due: {gChore.due}</p></header>
                        <p className='GoalBody'>{gChore.content}</p>
                    </div>
                )
            })}
            
            {yellowChores.map((yChore, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle yellow'><p className='hpGoalTitle'>{yChore.title}</p><p className='hpGoalDueDate'>Due: {yChore.due}</p></header>
                        <p className='GoalBody'>{yChore.content}</p>
                    </div>
                )
            })}

            {redChores.map((rChore, index) => {  
                return(
                    <div className="GoalList" key={index}>
                        <header id={index} className='GoalTitle red'><p className='hpGoalTitle'>{rChore.title}</p><p className='hpGoalDueDate'>Due: {rChore.due}</p></header>
                        <p className='GoalBody'>{rChore.content}</p>
                    </div>
                )
            })}

        </div>

    );
  
}

// ----------------------------------------------------------------------------------------------------^^RENDER^^----------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------vvFUNCTIONSvv---------------------------------------------------------------------------------------------

function newChore(){                        //paginates to the create chore page using local storage

    localStorage.setItem("activity", "NewChore");
    window.location.reload();

}

window.addEventListener('load', (event) => {

    currentUser = localStorage.getItem("currentUser");   //Establishes current user

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

    for (var i = 0; i < Chores.length; i += 1) {           //Loops through all chores

        if(currentUser === Chores[i].userID){                                                                    

            userChores.push({"title": Chores[i].title, "content": Chores[i].details, "due": Chores[i].due});     //Pushes all of the current user's chores to new array

        } 

    }

    for (var j = 0; j < userChores.length; j ++) {           //loops through current user's chores

        MinorChoreArr = userChores[j].due.split(' ') 

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

    for (var y = 0; y < parsedChoreDayArr.length; y ++) {          //loops through array of parsed due dates

        MinorChoreArr = userChores[y].due.split(' ') 

        if(MinorChoreArr[2] === CurrentDateArr[2]){

            if(MinorChoreArr[0] === CurrentDateArr[0]){

                if(parsedChoreDayArr[y] === currentDayParsed){

                    choreColor.push({'id' : y , 'color' : 'green', 'textC' : 'black'})    //Sets color to yellow if the chore is not due yet
                    greenChores.push(userChores[y])

                } else if (parsedChoreDayArr[y] > currentDayParsed){

                    choreColor.push({'id' : y , 'color' : 'yellow', 'textC' : 'black'})     //Sets color to green if the chore is due today
                    yellowChores.push(userChores[y])

                } else if (parsedChoreDayArr[y] < currentDayParsed){

                    choreColor.push({'id' : y , 'color' : 'red'})       //Sets color to red if the chore is passed due
                    redChores.push(userChores[y])

                }

            } else if (MinorChoreArr[0] > CurrentDateArr[0]){

                choreColor.push({'id' : y , 'color' : 'yellow', 'textC' : 'black'})     //Sets color to green if the chore is due today
                yellowChores.push(userChores[y])

            } else if (MinorChoreArr[0] < CurrentDateArr[0]){

                choreColor.push({'id' : y , 'color' : 'red'})     //Sets color to green if the chore is due today
                redChores.push(userChores[y])

            }

        } else if (MinorChoreArr[2] > CurrentDateArr[2]){

            choreColor.push({'id' : y , 'color' : 'yellow', 'textC' : 'black'})     //Sets color to green if the chore is due today
            yellowChores.push(userChores[y])

        } else if (MinorChoreArr[2] < CurrentDateArr[2]){

            choreColor.push({'id' : y , 'color' : 'red'})     //Sets color to green if the chore is due today
            redChores.push(userChores[y])

        }

    }

    localStorage.setItem('ChoreColor0', choreColor[0].color)
    localStorage.setItem('ChoretColor0', choreColor[0].textC)

});

export default Chore;