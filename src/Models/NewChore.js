import '../CSS/App.css';
import React from 'react';
// import users from '../Data/UserData.js';

let newThat

const initialFormData = Object.freeze({
  NChoreTitle: "",
  NChoreContent: "",
  due: ""
});

const NewChore = () => {

  const [formData, updateFormData] = React.useState(initialFormData);
  
  return (
    <div className="NGoal">

        <header className='NGoalTitl'><p>New Chore</p></header>

        <form className='NGoalBody'>

            <br/>
            <br/>
            <input type="text" id="NGoalTitle" name="NGoalTitle" onChange={changeChore} placeholder='  Title' required />

            <br/>
            <br/>
            <textarea id="NGoalContent" name="NGoalContent" onChange={changeChore} placeholder='  Content' required  rows="10" cols="50" ></textarea>

            <br/>
            <br/>
            <label for='Due'>Due Date</label><br/>
            <input type="date" id="Due" name="due" onChange={changeChore} required />

            <p id='ErrorText'></p>

            <br/>
            <br/>
            <a href='#Create'><input type="submit" value='submit' id='NGoalSubmit' className='greenBtn' onClick={createChore}/></a>

        </form>

        <br/>
        <br/>
        <button id='backtogoals' className='redBtn' onClick={backChore}>Cancel</button>

    </div>
  );

  function createChore(e){
    e.preventDefault()
    formData.due = localStorage.getItem('newDue')
    console.log(formData);
    
  }

  function changeChore(e){
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });

    if(e.target.name === 'due'){
      let that = e.target.value
      let arr = that.split("")
      let ordinal;
      let i = arr[9]
      var j = i % 10,
        k = i % 100;
      if (j === 1 && k !== 11) {
        ordinal = "st";
      }
      else if (j === 2 && k !== 12) {
        ordinal = "nd";
      }
      else if (j === 3 && k !== 13) {
        ordinal = "rd";
      }
      else {
        ordinal = "th";
      }
      newThat = arr[5] + arr[6] + ' ' + arr[8] + arr[9] + ordinal + " " + arr[0] + arr[1] + arr[2] + arr[3]
      localStorage.setItem("newDue", newThat);
    }

  }

  function backChore(){
    localStorage.setItem("activity", 'Chores');
    window.location.reload();
  }

}

export default NewChore;