import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const Navigate = useNavigate();

  const [userData, setUserData] = useState({
    'company': '',
    'username': '',
    'telephone': '',
    'contact': '',
    'merchandise': '',
    'password': ''
  });

  async function getValuesFromInput(e) {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'telephone') {
      // a filter to take only number
      value = value.replace(/\D/g, "");
    }
    if (name === 'merchandise' || name === 'username' || name === 'company' || name === 'contact') {
      // a filter to take only letter
      value = value.replace(/[^a-zA-Z]/g, "");
    }

    setUserData({ ...userData, [name]: value });
  };

  async function toSubmit() {
    try {
      if (userData.password === '') {
        // if the user don't enter the telephone alert an error to avoid potentially crashing
        alert('Please enter your telephone number to sign up');
        return;
      }
      if (userData.telephone === '') {
        // if the user don't enter the telephone alert an error to avoid potentially crashing
        alert('Please enter your telephone number to sign up');
        return;
      }
      if (userData.password === '') {
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
      <input type="text" id="companyName" name="companyName" onChange={getValuesFromInput} required />

      <label for='username'>Username:</label>
      <input type="text" id="username" name="username" onChange={getValuesFromInput} required />

      <label for='telephone'>Telephone:</label>
      <input type="text" id="telephone" name="telephone" onChange={getValuesFromInput} required />

      <label for='contact'>Your Contact Man In The Company:</label>
      <input type="text" id="contact" name="contact" onChange={getValuesFromInput} required />

      <label for="merchandise">Your merchandise:</label>
      <input type="password" id="merchandise" name="merchandise" onChange={getValuesFromInput} required />

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={getValuesFromInput} required />

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}

      <button onClick={toSubmit}>Sign Up</button>
    </div>
  </>
}