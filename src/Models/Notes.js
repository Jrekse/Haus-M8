import '../CSS/App.css';
import Note from '../Data/NoteData.js';

var note = [];
var currentUser;

function Notes() {

    return (
        <div className="Notes">
            <div className='NotesHeader'>
                <h1 className='NotesTitle'>Notes</h1>
                <button id='newNote' className='greenBtn' onClick={newNote}>Create new Note</button>
            </div>
            {note.map((note, index) => {
                return(
                    <div className="NoteList" id={index}>
                        <header className='NoteTitle'><p>{note.title}</p></header>
                        <p className='NoteBody'>{note.content}</p>
                    </div>
                )
            })}
        </div>
    );
  
}

function newNote(){
    localStorage.setItem("activity", "NewNote");
    window.location.reload();
}

window.addEventListener('load', (event) => {

  currentUser = localStorage.getItem("currentUser");

  for (var j = 0; j < Note.length; j += 1) {

    if(currentUser === Note[j].userID){

        note.push({"title": Note[j].title, "content": Note[j].content});

    } 

  }

});

export default Notes;