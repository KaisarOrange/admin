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
    <Box sx={{ margin: 1 }}>
      <Typography variant='h6' gutterBottom component='div'>
        Alamat
      </Typography>
      <Typography
        sx={{
          padding: '0px 0px',
          fontSize: '1rem',
        }}
      >
        {row.address}
      </Typography>
      <Toolbar />
      <Typography variant='h6' gutterBottom component='div'>
        Catatan
      </Typography>
      {row?.note?.map((e: any, i: number) => {
        return (
          <Typography
            sx={{
              padding: '0px 0px',
              fontSize: '1rem',
            }}
          >
            {i + 1}. {e.name}: {e.text}
          </Typography>
        );
      })}
      <Toolbar />
      <Typography variant='h6'>Pesanan</Typography>
      <Table size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Harga</TableCell>
            <TableCell align='left'>Jumlah</TableCell>
            <TableCell align='left'>Total price (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.order.map((historyRow: any) => (
            <TableRow key={historyRow.id}>
              <TableCell
                sx={{
                  fontSize: '1rem',
                }}
                component='th'
                scope='row'
              >
                {historyRow.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                }}
              >
                Rp.{converter(historyRow.price)}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                }}
                align='left'
              >
                {historyRow.amount}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  fontSize: '1rem',
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
                fontSize: '1rem',
              }}
              colSpan={2}
            >
              Subtotal
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1rem',
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
                fontSize: '1rem',
              }}
            >
              Ongkir
            </TableCell>
            <TableCell></TableCell>
            <TableCell
              sx={{
                fontSize: '1rem',
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
