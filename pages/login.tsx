import input from '@/utils/types/inputFormType';
import { Box, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUser } from './api/itemsCall';

function Login() {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(false);

  //------------------------ REACT QUERY -------------------------------------
  const { data: user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return getUser();
    },
    initialData: false,
    //  refetchInterval: 1000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>();

  const onSubmit = async (data: input) => {
    try {
      const userLogin = await axios({
        url: 'https://pastaboys-backend-production.up.railway.app/auth/login',
        data: { username: data.email, password: data.password },
        withCredentials: true,
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(userLogin);
      console.log(user);
      router.push('/');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
            <>
              {' '}
              <TextField
                error={errors.email && true}
                sx={{ backgroundColor: 'white' }}
                label='username'
                size='small'
                type='text'
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
          </Box>
          <Button
            variant='contained'
            color='warning'
            sx={{ backgroundColor: '#cc9b14' }}
            onClick={() => {
              getUser().then((e) => console.log(e));
            }}
          >
            Test
          </Button>
        </form>
      )}
    </Box>
  );
}

export default Login;
{
  /* <Box>
{' '}
<Button
  onClick={() => router.push('/')}
  variant='contained'
  color='warning'
  sx={{ backgroundColor: '#cc9b14' }}
>
  Enter
</Button>
</Box> */
}
