import { useNavigate } from 'react-router-dom';

export default function LogIn(props) {

  const Navigate = useNavigate();

  async function toSubmit(actionType) {
    try {
      if (actionType === 'logIn') {
        if (props.userData.telephone === '') {
          // if the user don't enter the telephone alert an error to avoid potentially crashing
          alert('Please enter your telephone number to log in');
          return;
        }
        if (props.userData.password === '') {
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
      <input type="text" id="telephone" name="telephone" onChange={props.getValuesFromInput} />

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={props.getValuesFromInput} />

      <button onClick={() => toSubmit('logIn')}>Log In</button>
    </div>

    <h3>Don't have an account?</h3>
    <button onClick={() => toSubmit('signUp')}>Sign Up</button>
  </>)
}