//import react from 'react';

function NewUser() {
    return <>
    <h1 className="text-center text-2xl mt-10">Just before you log in, please enter your details</h1>
    <form action="submit.php" method="POST">
      <label for="companyName">Company Name:</label>
      <input type="text" id="companyName" name="companyName" required/>

      <label for='telephone'>Telephone:</label>
      <input type="text" id="telephone" name="telephone" required/>

      <label for='agentName'>Your Agent Name:</label>
      <input type="text" id="agentName" name="agentName" required/>

      <label for="merchandise">Your merchandise:</label>
      <input type="password" id="merchandise" name="merchandise" required/>

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}
  
      <button type="submit">Enter</button>
    </form>
    </>
  }
  
  export default NewUser;