import { auth } from '@/firebaseConfig';
import { getUser } from '@/pages/api/itemsCall';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function RouterGuard({ children }: any) {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return getUser();
    },
    //  refetchInterval: 1000,
  });

  useEffect(() => {
    console.log(user);
    authCheck(router.asPath);

    const hideContent = () => setIsAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  });

  const authCheck = (url: string) => {
    if (user === false && url !== '/login') {
      setIsAuthorized(false);
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  };

  return isAuthorized && children;
}

export default RouterGuard;
