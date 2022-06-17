import '../CSS/App.css';
import React from 'react';



var uName
var pword
var email
var dob

const SignUp = () => {

  return (
    <div className="Login">

        <header className='loginTitle'><p>Sign Up</p></header>

        <form className='loginBody'>

            <br/>
            <br/>
            <label for='DOB'>DOB</label><br/>
            <input type="date" id="DOB" name="dob" onChange={changeAcc} required />

            <br/>
            <br/>
            <input type="text" id="userName" name="uName" onChange={changeAcc} placeholder='  Username' required />

            <br/>
            <br/>
            <input type="password" id="password" name="pword" onChange={changeAcc} placeholder='  Password' required />

            <br/>
            <br/>
            <input type="password" id="ConfirmPassword" name="ConfirmPassword"  placeholder='  Confirm Password' required />

            <br/>
            <br/>
            <input type="text" id="email" name="email" onChange={changeAcc} placeholder='  Email' required />

            <p id='ErrorText'></p>

            <br/>
            <br/>
            <a href='#Home'><input type="submit" value='submit' id='loginSubmit' className='greenBtn' onClick={createAcc}/></a>

        </form>

        <br/>
        <br/>
        <button id='backtologin' className='greenBtn' onClick={backLogin}>Go back to Login</button>

    </div>
  );

  function createAcc(event){
    console.log(uName + pword + dob + email)
    event.preventDefault()
  }

  function changeAcc() {
    uName = document.getElementById('userName').value
    pword = document.getElementById('password').value
    dob = document.getElementById('DOB').value
    email = document.getElementById('email').value


  }

  function backLogin(){
    localStorage.setItem("LoginStatus", "loggedOut");
    window.location.reload();
  }

}

export default SignUp;