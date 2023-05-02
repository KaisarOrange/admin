import { auth } from '@/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function RouterGuard({ children }: any) {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const result = await axios.get('http://localhost:8500/auth/user', {
          withCredentials: true,
        });

        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    refetchInterval: 1000,
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
