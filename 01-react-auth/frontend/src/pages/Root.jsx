import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'POST'});
      return ;
    }
    
    const expiration = getTokenDuration();
    const time = setTimeout(() => {
      submit(null, {action: '/logout', method: 'POST'});
    }, expiration)

    return () => clearTimeout(time);
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
