import Box from '@mui/material/Box';
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Divider, Toolbar } from '@mui/material';
import AlertDialog from './Alerts';
import CircularProgress from '@mui/material/CircularProgress';

function Row(props: any) {
  const { row, i, state, page, isFetching } = props;
  const [open, setOpen] = React.useState(false);
  const odd: boolean = i % 2 === 0;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          ...(odd && { backgroundColor: '#fff5e8' }),
        }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{
            padding: '0px 0px',
            fontSize: '1rem',
          }}
          component='th'
          scope='row'
        >
          {isFetching ? '' : row.name}
        </TableCell>
        <TableCell
          sx={{
            padding: '0px 0px',
            fontSize: '1rem',
          }}
          align='left'
        >
          {isFetching ? '' : row.number}
        </TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '10vh',
            fontSize: '1rem',
          }}
          align='left'
        >
          {isFetching ? '' : row.address}
        </TableCell>
        <TableCell>
          <AlertDialog state={state} data={row} page={page} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
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
                {isFetching ? '' : row.address}
              </Typography>
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
                        Rp.{historyRow.price}
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
                        Rp.{historyRow.amount * historyRow.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell
                      sx={{ height: '20px', border: 'none' }}
                    ></TableCell>
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
                      Rp. 200
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
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
