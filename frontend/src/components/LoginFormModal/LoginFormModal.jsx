import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import '../../../src/components/LoginFormModal/LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  let [credential, setCredential] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUserSubmit = (e) => {
    console.log("The Boy King Logged In");
    e.preventDefault();
    setErrors({});
    // Correct way to pass credentials as an object
    return dispatch(sessionActions.login({ credential: "Demo-Dweller", password: "password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
    <div className="loginmodal-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label className='label'>
            Username or Email
            <input
              className="loginmodal-container input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className='label'>
            Password
            <input
              className="loginmodal-container input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
          <div className='loginButtonArea'>
          <button type="submit">Log In</button>
          <button type="button" onClick={handleDemoUserSubmit}>Log In as Demo User</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;