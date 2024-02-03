import { authActions } from '../store/auths';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const authDispatch = useDispatch(authActions);
  function handleLogOut() {
    authDispatch(authActions.logout());
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </nav>)}
    </header>
  );
};

export default Header;
