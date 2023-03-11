import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import React from 'react';
import Main from './Main';

function MainComponent({
  orderDataDoneQuery,
  orderDataQuery,
  state,
  page,
  setPage,
  isFetching,
  open,
  setState,
}: any) {
  const Table = dynamic(() => import('./Order/TableCollapse'), {
    ssr: false,
  });
  return (
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
            setPage((prev: any) => prev - 1);
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
            setPage((prev: any) => prev + 1);
          }}
          variant='text'
          disabled={
            state < 2
              ? orderDataQuery[orderDataQuery.length - 1]?.isLastItemExist ===
                  true || orderDataQuery.length === 0
              : orderDataDoneQuery[orderDataDoneQuery.length - 1]
                  ?.isLastItemExist === true || orderDataDoneQuery.length === 0
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

      {/* <BasicTable data={orderData} /> */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}></Box>
      {/* <Button onClick={() => signOutt()}>Test</Button> */}
    </Main>
  );
}

export default MainComponent;
