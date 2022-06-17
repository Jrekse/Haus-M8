import '../CSS/App.css';
import React from 'react';
// import users from '../Data/UserData.js';

const initialFormData = Object.freeze({
  NNoteTitle: "",
  NNoteContent: ""
});


const NewNote = () => {

  const [formData, updateFormData] = React.useState(initialFormData);

  return (
    <div className="NNote">

        <header className='NNoteTitl'><p>New Note</p></header>

        <form className='NNoteBody'>

            <br/>
            <br/>
            <input type="text" id="NNoteTitle" name="NNoteTitle" onChange={changeNote} placeholder='  Title' required />

            <br/>
            <br/>
            <textarea id="NNoteContent" name="NNoteContent" onChange={changeNote} placeholder='  Content' required  rows="10" cols="50" ></textarea>

            <p id='ErrorText'></p>

            <br/>
            <br/>
            <a href='#Create'><input type="submit" value='submit' id='NNoteSubmit' className='greenBtn' onClick={createNote}/></a>

        </form>

        <br/>
        <br/>
        <button id='backtonotes' className='redBtn' onClick={backNote}>Cancel</button>

    </div>
  );

  function createNote(e){
    e.preventDefault()
    console.log(formData);
    
  }

  function changeNote(e) {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  }

  function backNote(){
    localStorage.setItem("activity", 'Notes');
    window.location.reload();
  }

}

export default NewNote;