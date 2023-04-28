import Box from '@mui/material/Box';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from './Row';
import CollapseProps from '@/utils/interfaces/CollapseProps';

export default function CollapsibleTable({
  data,
  state,
  page,
  isFetching,
}: CollapseProps) {
  const tableData = data;
  return (
    <TableContainer sx={{ maxWidth: '90vw', margin: 'auto' }} component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead sx={{ backgroundColor: '#dbae30' }}>
          <TableRow>
            <TableCell />
            <TableCell align='left'>Nama</TableCell>
            <TableCell align='center'>Hp</TableCell>
            {/* <TableCell align='left'>Alamat</TableCell> */}
            <TableCell align='left'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row, i: number) => (
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
