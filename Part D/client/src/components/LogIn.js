import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {

  const Navigate = useNavigate();

  const [connectionData, setConnectionData] = useState({
    'telephone': '',
    'password': ''
  });

  async function getValuesFromInput(e) {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "telephone") {
      // a filter to take only number
      value = value.replace(/\D/g, "");
    }

    setConnectionData({ ...connectionData, [name]: value });
  };

  async function toSubmit(actionType) {
    try {
      if (actionType === 'logIn') {
        if (connectionData.telephone === '') {
          // if the user don't enter the telephone alert an error to avoid potentially crashing
          alert('Please enter your telephone number to log in');
          return;
        }
        if (connectionData.password === '') {
          // if the user don't enter the password alert an error to avoid potentially crashing
          alert('Please enter your password to log in');
          return;
        }
        else {
          Navigate('/OrderList');
        }
      }
      if (actionType === 'signUp') {
        Navigate('/SignUp');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (<>
    <h1>Hello! To manage your orders, log in now</h1>
    <div>
      <label for="telephone">Telephone:</label>
      <input type="text" id="telephone" name="telephone" onChange={getValuesFromInput} required />

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={getValuesFromInput} required />

      <button onClick={() => toSubmit('logIn')}>Log In</button>
    </div>

    <h3>Don't have an account?</h3>
    <button onClick={() => toSubmit('signUp')}>Sign Up</button>
  </>)
}