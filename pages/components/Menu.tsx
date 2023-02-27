import {
  AppBar,
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
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MuiAppBar, {
  AppBarProps as MuiAppBarProps,
  AppBarProps,
} from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Inbox from '@mui/icons-material/Inbox';
import Mail from '@mui/icons-material/Mail';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import BasicTable from './Order/Table';
import CollapsibleTable from './Order/TableCollapse';
import { useQuery } from '@tanstack/react-query';
import { getDoneOrder, getOrder, isTrue } from '../api/itemsCall';

function Menu({ orderData, doneData }: any) {
  const [state, setState]: any = useState(1);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const {
    data: orderDataQuery,
    isLoading: isLoadingOrder,
    isFetching,
  } = useQuery({
    queryKey: ['row', page],
    queryFn: () => {
      return getOrder(page);
    },
    initialData: orderData,
  });
  const { data: orderDataDoneQuery, isLoading: IsLoadingDone } = useQuery(
    ['rowDone'],
    getDoneOrder,
    doneData
  );

  // const hello = isTrue().then((res) => console.log(res));

  useEffect(() => {
    isTrue().then((res) => setIsLastPage(res));
  }, [page]);

  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${200}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  type openType = {
    open: any;
  };
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${200}px)`,
      marginLeft: `${200}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
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
          {['Order', 'Financials', 'Send email', 'Drafts'].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <CollapsibleTable
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
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            variant='contained'
            color='primary'
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            variant='contained'
            disabled={isLastPage}
            color='primary'
          >
            Next
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
            }}
            variant='contained'
            color='error'
          >
            Done
          </Button>
        </Box>

        {/* <BasicTable data={orderData} /> */}
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}></Box>
        <Button onClick={() => console.log('aaa ', orderData.length)}>
          Test
        </Button>
      </Main>
    </Box>
  );
}

export default Menu;
