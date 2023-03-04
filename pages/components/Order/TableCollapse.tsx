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
import Row from './Row';

export default function CollapsibleTable({
  data,
  dataDone,
  state,
  page,
  isFetching,
}: any) {
  interface rowData {
    name: string;
    number: string;
    address: string;
    order: string[];
  }
  const tableData = state === 1 ? data : dataDone;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '440px' }} aria-label='collapsible table'>
        <TableHead sx={{ backgroundColor: '#dbae30' }}>
          <TableRow>
            <TableCell />
            <TableCell align='left'>Nama</TableCell>
            <TableCell align='left'>Hp</TableCell>
            <TableCell align='left'>Alamat</TableCell>
            <TableCell align='left'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row: rowData, i: number) => (
            <Row
              key={row.name + i.toString()}
              row={row}
              i={i}
              state={state}
              page={page}
              isFetching={isFetching}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
