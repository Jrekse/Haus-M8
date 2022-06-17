import '../CSS/App.css';
import Users from '../Data/UserData.js';

function Login(props) {
  return (
    <div className="Login">

        <header className='loginTitle'><p>Login</p></header>

        <form className='loginBody'>

            <br/>
            <input type="text" id="userName" name="userName" placeholder='  Username or Email' required />

            <br/>
            <br/>
            <input type="password" id="password" name="password" placeholder='  Password' required />

            <p id='ErrorText'></p>

            <br/>
            <br/>
            <a href='#Home'><input type="submit" value='submit' id='loginSubmit' className='greenBtn' onClick={validateLogin}/></a>

        </form>

        <br/>
        <br/>
        <button id='signUpBtn' className='greenBtn' onClick={signUp}>Or Click Here to Sign Up!</button>

    </div>
  );

  // Validates login info, renders new page
  async function validateLogin(event){

    let uN = document.getElementById('userName').value

    let pW = document.getElementById('password').value


    for (var i = 0; i < Users.length; i += 1) {

      if(uN === Users[i].uname || uN === Users[i].email){

        if(pW === Users[i].pword){

          var uid = Users[i].uid;
          localStorage.setItem("currentUser", uid)
          loginSuccess()

        } else {

          
          loginFail()

        }

      } else {

        loginFail()

      }

    }

    function loginSuccess(){

      localStorage.setItem("LoginStatus", "loggedIn");
      window.location.reload();

    }

    function loginFail(){

      event.preventDefault()

      document.getElementById("ErrorText").innerHTML = "Your Username or Password is incorrect";

    }

  }

  // takes you to sign up page
  function signUp(){

    // event.preventDefault()
    // document.getElementById("ErrorText").innerHTML = "This Feature Has Not Been Added Yet";

    localStorage.setItem("LoginStatus", "signUp");

    window.location.reload();

  }
}

export default Login;
