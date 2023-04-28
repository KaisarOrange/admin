import { getOrder } from '@/pages/api/itemsCall';
import mainComponentProps from '@/utils/interfaces/mainComponentProps';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Toolbar from '@mui/material/Toolbar';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';
import Main from './Main';
import TableCollapse from './Order/TableCollapse';

function MainComponent({
  state,
  page,
  setPage,
  open,
  setState,
}: mainComponentProps) {
  const Table = dynamic(() => import('./Order/TableCollapse'), {
    ssr: false,
  });

  const { data: orderDataQuery, isLoading: isFetching } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => {
      return getOrder();
    },
    initialData: [],
  });

  return (
    <Main open={open}>
      <Toolbar />
      <TableCollapse
        data={orderDataQuery}
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
            setPage((prev: any) => prev - 1);
          }}
          variant='text'
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
            setPage((prev: any) => prev + 1);
          }}
          variant='text'
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
          sx={{ fontSize: '0.6rem' }}
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
          sx={{ fontSize: '0.6rem' }}
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

      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}></Box>
    </Main>
  );
}

export default MainComponent;
