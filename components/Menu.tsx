import {
  Box,
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

function Menu({ orderData }: any) {
  const [state, setState] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [menuPage, setMenuPage] = useState<number>(0);

  // { enabled: Boolean(user) }

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
      </Drawer>
      <MainComponent
        setPage={setPage}
        setState={setState}
        state={state}
        page={page}
        open={open}
      />
    </Box>
  );
}

export default Menu;
