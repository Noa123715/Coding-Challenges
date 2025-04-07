import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn(props) {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function enterValue(e) {
    let { name, value } = e.target;

    if (name === 'username') {
      // a filter to take only letter
      value = value.replace(/[^a-zA-Z]/g, "");
    }

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  async function toSubmit(actionType) {
    try {
      if (actionType === "logIn") {
        if (username === "") {
          // if the user don't enter the username alert an error to avoid potentially crashing
          alert("Please enter your username number to log in");
          return;
        }
        if (password === "") {
          // if the user don't enter the password alert an error to avoid potentially crashing
          alert("Please enter your password to log in");
          return;
        } 
        else {
          let response = await fetch(
            `http://localhost:2000/api/users/username/${username}/password/${password}`
          );
          let user = await response.json();
          if (user.length > 0) {
            props.getUserValues(user[0]);
            //props.getUserValues(JSON.stringify(user[0]));
            Navigate('/OrderList');
          } 
          else alert("username or password worng");
        }
      }
      if (actionType === "signUp") {
        Navigate("/SignUp");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="center">
      <h1>Wellcome To SuperMarket 🛍️</h1>
      <div className="log">
        <h2>To manage your orders, log in now</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" onChange={enterValue} />
        <br /> <br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={enterValue} />
        <br /> <br />
        <button className="myButton" onClick={() => toSubmit("logIn")}>Log In</button>
      </div>

      <h3>Don't have an account?</h3>
      <button className="myButton" onClick={() => toSubmit("signUp")}>Sign Up</button>
    </div>
  );
}
