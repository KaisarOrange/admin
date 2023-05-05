import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  finishOrder,
  getDetail,
  getFinishOrder,
  getOrder,
  getTotalPages,
  revokeFinishOrder,
} from '@/pages/api/itemsCall';
import dataType from '@/utils/interfaces/data';

export default function AlertDialog(props: {
  state: number;
  data: any;
  page: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { refetch: order } = useQuery({
    queryKey: ['customer', props.page],
    queryFn: () => {
      return getOrder(props.page);
    },
    initialData: [],
  });

  const { refetch: finish } = useQuery({
    queryKey: ['finish', props.page],
    queryFn: () => {
      return getFinishOrder(props.page);
    },
    initialData: [],
  });

  const { refetch: pageFalse } = useQuery({
    queryKey: ['pagefalse'],
    queryFn: () => {
      return getTotalPages('false');
    },
    initialData: [],
  });

  const { refetch: pageTrue } = useQuery({
    queryKey: ['pagetrue'],
    queryFn: () => {
      return getTotalPages('true');
    },
    initialData: [],
  });

  const mutation = useMutation({
    mutationFn: async () => {
      props.state < 2
        ? finishOrder(props.data.order_id)
        : revokeFinishOrder(props.data.order_id);
      pageFalse();
      pageTrue();
      handleClose();
    },
  });

  if (mutation.isSuccess) {
    finish();
    order();
  }

  return (
    <div>
      <Button
        sx={{ fontSize: { xs: '0.6rem', sm: '0.9rem' } }}
        variant='outlined'
        onClick={handleClickOpen}
      >
        {props.state < 2 ? 'Selesai' : 'batal'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {props.state < 2 ? 'Selesaikan pesanan?' : 'Batalkan status selesai?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              mutation.mutate();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
