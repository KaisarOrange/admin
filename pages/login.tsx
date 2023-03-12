import { auth } from '@/firebaseConfig';
import { Box, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

function Login() {
  type input = {
    email: string;
    password: string;
  };
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<input>();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const signOutt = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('hello');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const onSubmit = (data: input) => {
    signInWithEmailAndPassword(data.email, data.password);
    if (user !== null) {
      router.push('/');
    }
  };
  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e0a912',
        height: '100vh',
      }}
    >
      {loading ? (
        <CircularProgress color='warning' />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '60px 50px',
              gap: '20px',
              borderRadius: '10px',
            }}
          >
            <Image alt='' src='/pastaboys.png' width={200} height={65} />
            {user !== null ? (
              <Box>
                {' '}
                <Button
                  onClick={() => router.push('/')}
                  variant='contained'
                  color='warning'
                  sx={{ backgroundColor: '#cc9b14' }}
                >
                  Enter
                </Button>
              </Box>
            ) : (
              <>
                {' '}
                <TextField
                  error={errors.email && true}
                  sx={{ backgroundColor: 'white' }}
                  label='Email'
                  size='small'
                  type='email'
                  helperText={errors.password && 'Email salah'}
                  {...register('email', {
                    required: true,
                  })}
                />
                <TextField
                  error={errors.password && true}
                  sx={{ backgroundColor: 'white' }}
                  label='Password'
                  size='small'
                  type='password'
                  helperText={errors.password && 'password salah'}
                  {...register('password', {
                    required: 'Password salah',
                  })}
                />
                <Button
                  variant='contained'
                  color='warning'
                  sx={{ backgroundColor: '#cc9b14' }}
                  type='submit'
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </form>
      )}
    </Box>
  );
}

export default Login;
