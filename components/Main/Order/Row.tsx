import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AlertDialog from './Alerts';
import CollapseComponent from './CollapseComponent';
import rowProps from '@/utils/interfaces/rowProps';
import { useQuery } from '@tanstack/react-query';
import { getFinishOrder, getOrder } from '@/pages/api/itemsCall';

function Row({ row, i, state, page }: rowProps) {
  const [open, setOpen] = React.useState(false);
  const odd: boolean = i % 2 === 0;
  const date = new Date(row.date);
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
            flexShrink: '1',
            fontSize: { xs: '0.8rem', sm: '1rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '8vh',
          }}
          component='th'
          scope='row'
        >
          {row.name}
        </TableCell>
        <TableCell
          sx={{
            padding: '0px 0px',
            fontSize: { xs: '0.8rem', sm: '1rem' },
          }}
          align='center'
        >
          {`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`}
        </TableCell>
        {/* <TableCell
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '10vh',
          }}
          align='left'
        >
          {row.address}
        </TableCell> */}
        <TableCell>
          <AlertDialog state={state} data={row} page={page} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ padding: '0' }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <CollapseComponent i={i} id={row.id} page={page} state={state} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
