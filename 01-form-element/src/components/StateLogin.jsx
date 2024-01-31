import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: ''
  })
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })
  const emailIsInvalid = didEdit.email && !enteredValue.email.includes('@');
  const passwordIsInvalid = didEdit.password && enteredValue.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleInputBlur(identifier) {
    setDidEdit(prev => ({
      ...prev,
      [identifier]: true
    }))
  }
  function handleEnterChange(identifier, value) {
    setEnteredValue(prev => ({
      ...prev,
      [identifier]: value
    }))
    setDidEdit(prev => ({
      ...prev,
      [identifier]: false
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
          label="Email" id="email" type="email" name="email"
          value={enteredValue.email}
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleEnterChange('email', event.target.value)}
          error={emailIsInvalid && 'Please enter a valid email!'}
          />
        <Input label="Password" id="password" type="password" name="password"
          value={enteredValue.email}
          onBlur={() => handleInputBlur('password')}
          onChange={(event) => handleEnterChange('password', event.target.value)}
          error={passwordIsInvalid && 'Please enter a valid password!'}
          />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
