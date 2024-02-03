import classes from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auths';

const Auth = () => {
  const authDispatch = useDispatch();

  function authhandle(event) {
    event.preventDefault();
    authDispatch(authActions.login());
  }
 
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={authhandle}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section> 
    </main>
  );
};

export default Auth;
