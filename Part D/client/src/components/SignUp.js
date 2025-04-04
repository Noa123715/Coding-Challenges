import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {

  const Navigate = useNavigate();

  async function toSubmit() {
    try {
      if (props.userData.password === '') {
        // if the user don't enter the telephone alert an error to avoid potentially crashing
        alert('Please enter your telephone number to sign up');
        return;
      }
      if (props.userData.telephone === '') {
        // if the user don't enter the telephone alert an error to avoid potentially crashing
        alert('Please enter your telephone number to sign up');
        return;
      }
      if (props.userData.password === '') {
        // if the user don't enter the password alert an error to avoid potentially crashing
        alert('Please enter your password to sign up');
        return;
      }
      else {
        Navigate('/OrderList');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return <>
    <h1>Hello! we happy to have you</h1>
    <div>
      <label for="companyName">Company Name:</label>
      <input type="text" id="companyName" name="companyName" onChange={props.getValuesFromInput} />

      <label for='username'>Username:</label>
      <input type="text" id="username" name="username" onChange={props.getValuesFromInput} />

      <label for='telephone'>Telephone:</label>
      <input type="text" id="telephone" name="telephone" onChange={props.getValuesFromInput} />

      <label for='contact'>Your Contact Man In The Company:</label>
      <input type="text" id="contact" name="contact" onChange={props.getValuesFromInput} />

      <label for="merchandise">Your merchandise:</label>
      <input type="password" id="merchandise" name="merchandise" onChange={props.getValuesFromInput} />

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={props.getValuesFromInput} />

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}

      <button onClick={toSubmit}>Sign Up</button>
    </div>
  </>
}