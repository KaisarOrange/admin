import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Inbox from '@mui/icons-material/Inbox';

import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../api/itemsCall';
import dynamic from 'next/dynamic';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Main from './Main/Main';
import AppBar from './Main/AppBar';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getAuth, signOut } from 'firebase/auth';

const Table = dynamic(() => import('./Order/TableCollapse'), { ssr: false });

function Menu({ orderData, doneData, hello }: any) {
  const [state, setState]: any = useState(1);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
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
  const { data: orderDataQuery, isLoading: isFetching } = useQuery({
    queryKey: ['row', page],
    queryFn: () => {
      return getOrder(page, 'order');
    },
    initialData: [],
  });

  const { data: orderDataDoneQuery } = useQuery({
    queryKey: ['rowDone', page],
    queryFn: () => {
      return getOrder(page, 'done');
    },
    initialData: [],
  });
  // { enabled: Boolean(user) }
  // const hello = isTrue().then((res) => console.log(res));

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        open={open}
        position='fixed'
        sx={{
          ml: `${200}px`,
          backgroundColor: '#d7a20f',
        }}
      >
        <Toolbar>
          <MenuIcon
            sx={{ cursor: 'pointer', ...(open && { display: 'none' }) }}
            onClick={() => setOpen(!open)}
          />
          <KeyboardArrowLeftIcon
            sx={{ cursor: 'pointer', ...(!open && { display: 'none' }) }}
            onClick={() => setOpen(!open)}
          />
          <Toolbar />
          <Typography variant='h6' noWrap component='div'>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        variant='persistent'
        open={open}
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
      >
        <Image alt='' src='/pastaboys.png' width={200} height={65} />
        <Divider />
        <List>
          {['Order', 'Financials'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => console.log('hello')}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <AttachMoneyIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Table
          data={orderDataQuery}
          dataDone={orderDataDoneQuery}
          state={state}
          page={page}
          isFetching={isFetching}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {' '}
          <Button
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            variant='text'
            disabled={
              state < 2
                ? orderDataQuery[0]?.isItemExist === true ||
                  orderDataQuery?.length === 0
                : orderDataDoneQuery[0]?.isItemExist === true ||
                  orderDataDoneQuery?.length === 0
            }
            color='warning'
          >
            {'<'}
          </Button>
          <Button
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            variant='text'
            disabled={
              state < 2
                ? orderDataQuery[orderDataQuery.length - 1]?.isLastItemExist ===
                    true || orderDataQuery.length === 0
                : orderDataDoneQuery[orderDataDoneQuery.length - 1]
                    ?.isLastItemExist === true ||
                  orderDataDoneQuery.length === 0
            }
            color='warning'
          >
            {'>'}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {' '}
          <Button
            disabled={state === 1}
            onClick={() => {
              setState(1);
              setPage(0);
            }}
            variant='contained'
            color='success'
          >
            New
          </Button>
          <Button
            disabled={state === 2}
            onClick={() => {
              setState(2);
              setPage(0);
            }}
            variant='contained'
            color='error'
          >
            Done
          </Button>
        </Box>
        {hello}
        {/* <BasicTable data={orderData} /> */}
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}></Box>
        {/* <Button onClick={() => signOutt()}>Test</Button> */}
      </Main>
    </Box>
  );
}

export default Menu;
