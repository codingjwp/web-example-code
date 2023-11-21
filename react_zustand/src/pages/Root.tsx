import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from './root.module.css';

export default function Root() {
  const navMenu = [
    { path: '/', menu: 'Base Zustand' }
  ]
  const menu = navMenu.length > 0 ? navMenu.map(nav => <Link key={nav.menu} to={nav.path}><span>{nav.menu}</span></Link>) : null;

  return (
    <div>
      <header className={styles.head}>
        {menu}
      </header>
      <Outlet/>
    </div>
  )
}