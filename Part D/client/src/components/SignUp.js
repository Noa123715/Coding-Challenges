import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {

  const Navigate = useNavigate();

  const merchandiseList = ["apple", "banana"];

  async function setSupplier(e) {
    e.preventDefault();
    props.setUserData({ ...props.userData, 'merchandise': e.target.value });
  }

  async function toSubmit() {
    try {
      if (props.userData.password === '') {
        // if the user don't enter the password alert an error to avoid potentially crashing
        alert('Please enter your password number to sign up');
        return;
      }
      if (props.userData.telephone === '') {
        // if the user don't enter the telephone alert an error to avoid potentially crashing
        alert('Please enter your telephone number to sign up');
        return;
      }
      if (props.userData.username === '') {
        // if the user don't enter the username alert an error to avoid potentially crashing
        alert('Please enter your username to sign up');
        return;
      }
      if (props.userData.company === '') {
        // if the user don't enter the company alert an error to avoid potentially crashing
        alert('Please enter your company to sign up');
        return;
      }
      if (props.userData.contact === '') {
        // if the user don't enter the contact alert an error to avoid potentially crashing
        alert('Please enter your contact to sign up');
        return;
      }
      if (props.userData.merchandise === '') {
        // if the user don't enter the merchandise alert an error to avoid potentially crashing
        alert('Please enter your merchandise to sign up');
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
      <label for="company">Company Name:</label>
      <input type="text" id="company" name="company" onChange={props.getValuesFromInput} />

      <label for='username'>Username:</label>
      <input type="text" id="username" name="username" onChange={props.getValuesFromInput} />

      <label for='telephone'>Telephone:</label>
      <input type="text" id="telephone" name="telephone" onChange={props.getValuesFromInput} />

      <label for='contact'>Your Contact Man In The Company:</label>
      <input type="text" id="contact" name="contact" onChange={props.getValuesFromInput} />

      <label for="merchandise">Your merchandise:</label>
      <select id="dropdown" value={props.userData.merchandise} onChange={setSupplier}>
        <option value="">    Please choose an option    </option>
        {merchandiseList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={props.getValuesFromInput} />

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}

      <button onClick={toSubmit}>Sign Up</button>
    </div>
  </>
}