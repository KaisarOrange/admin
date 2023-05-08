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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AppBar from './Main/AppBar';
import MainComponent from './Main/MainComponent';
import axios from 'axios';
import { useRouter } from 'next/router';
import FinanceComponent from './Finance/FinanceComponent';

function Menu({ orderData }: any) {
  const [open, setOpen] = useState<boolean>(false);

  const [menuPage, setMenuPage] = useState<number>(0);

  const router = useRouter();

  // { enabled: Boolean(user) }
  const logOut = async () => {
    const ax = await axios.delete('http://localhost:8500/auth/logout', {
      withCredentials: true,
    });
    router.push('/login');
  };

  const renderSwitch = (pageMenu: number) => {
    switch (pageMenu) {
      case 0:
        return <MainComponent open={open} />;
      case 1:
        return <FinanceComponent open={open} />;
      default:
        return 'foo';
    }
  };

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
          {['Order', 'Financials'].map((text, index: number) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setMenuPage(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <AttachMoneyIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          onClick={() => {
            logOut();
          }}
        >
          Log out
        </Button>
      </Drawer>
      {renderSwitch(menuPage)}
    </Box>
  );
}

export default Menu;
