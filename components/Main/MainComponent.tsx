import {
  getFinishOrder,
  getOrder,
  getTotalPages,
  getUser,
} from '@/pages/api/itemsCall';
import mainComponentProps from '@/utils/interfaces/mainComponentProps';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Toolbar from '@mui/material/Toolbar';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Main from './Main';
import TableCollapse from './Order/TableCollapse';
import axios from 'axios';

function MainComponent({ open }: mainComponentProps) {
  const [state, setState] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { data: orderDataQuery, isLoading: isFetching } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => {
      return getOrder(page);
    },
    initialData: [],
  });

  const { data: finishOrder } = useQuery({
    queryKey: ['finish', page],
    queryFn: () => {
      return getFinishOrder(page);
    },
    initialData: [],
  });

  const { data: pageNumberFalse } = useQuery({
    queryKey: ['pagefalse'],
    queryFn: () => {
      return getTotalPages('false');
    },
    initialData: [],
  });

  const { data: pageNumberTrue } = useQuery({
    queryKey: ['pagetrue'],
    queryFn: () => {
      return getTotalPages('true');
    },
    initialData: [],
  });

  const pageLimit = Math.ceil(
    parseInt(state < 2 ? pageNumberFalse : pageNumberTrue) / 5
  );
  const Table = dynamic(() => import('./Order/TableCollapse'), {
    ssr: false,
  });

  return (
    <Main open={open}>
      <Toolbar />
      <TableCollapse
        data={state === 1 ? orderDataQuery : finishOrder}
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
          disabled={page === 1}
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
          disabled={page === pageLimit}
          onClick={() => {
            console.log(pageLimit);
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
            setPage(1);
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
            setPage(1);
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
