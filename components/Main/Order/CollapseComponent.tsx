import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import converter from './functions/converter';

function CollapseComponent({ row }: any) {
  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography
        sx={{ fontSize: '0.9rem', padding: '10px', fontWeight: '600' }}
      >
        Nama: {row.name}
      </Typography>
      <Typography
        sx={{ fontSize: '0.9rem', padding: '10px', fontWeight: '600' }}
      >
        Hp : {row.number}
      </Typography>
      <Typography
        sx={{ fontSize: '1rem', padding: '10px' }}
        variant='h6'
        gutterBottom
        component='div'
      >
        Alamat:
      </Typography>
      <Typography
        sx={{
          padding: '0px 10px',
          fontSize: '0.8rem',
        }}
      >
        {row.address}
      </Typography>
      <Toolbar />
      <Typography
        sx={{ fontSize: '1rem', padding: '10px' }}
        variant='h6'
        gutterBottom
        component='div'
      >
        Catatan:
      </Typography>
      {row?.note?.map((e: any, i: number) => {
        return (
          <Typography
            sx={{
              padding: '0px 10px',
              fontSize: '0.8rem',
            }}
          >
            {i + 1}. {e.name}: {e.text}
          </Typography>
        );
      })}
      <Toolbar />
      {/* <Typography sx={{ fontSize: '1rem' }} variant='h6'>
        Pesanan
      </Typography> */}
      <Table size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '0.8rem', padding: '0' }}>
              Pesanan
            </TableCell>
            <TableCell sx={{ fontSize: '0.8rem', padding: '0' }}>
              Harga
            </TableCell>
            <TableCell sx={{ fontSize: '0.8rem', padding: '0' }}>
              Jumlah
            </TableCell>
            <TableCell sx={{ fontSize: '0.8rem', padding: '0' }} align='center'>
              Total price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.order.map((historyRow: any) => (
            <TableRow key={historyRow.id}>
              <TableCell sx={{ fontSize: '0.8rem' }} component='th' scope='row'>
                {historyRow.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '0.8rem',
                }}
              >
                Rp.{converter(historyRow.price)}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '0.8rem',
                }}
                align='left'
              >
                {historyRow.amount}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  fontSize: '0.8rem',
                }}
              >
                Rp.{converter(historyRow.amount * historyRow.price)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell sx={{ height: '20px', border: 'none' }}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                fontSize: '0.8rem',
              }}
              colSpan={2}
            >
              Subtotal
            </TableCell>
            <TableCell
              sx={{
                fontSize: '0.8rem',
              }}
              align='right'
            >
              Rp.
              {converter(
                row?.order.reduce((acc: any, e: any) => {
                  return e.price * e.amount + acc;
                }, 0)
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                fontSize: '0.8rem',
              }}
            >
              Ongkir
            </TableCell>
            <TableCell></TableCell>
            <TableCell
              sx={{
                fontSize: '0.8rem',
              }}
              align='right'
            >
              Rp. 0
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default CollapseComponent;
