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
import { getOrder } from '@/pages/api/itemsCall';
import dataType from '@/utils/interfaces/data';

export default function AlertDialog(props: {
  state: number;
  data: dataType;
  page: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { refetch: refetchRow } = useQuery({
    queryKey: ['row', props.page],
    queryFn: () => {
      return getOrder();
    },
    enabled: false,
  });
  const { refetch: refetchDone } = useQuery({
    queryKey: ['rowDone', props.page],
    queryFn: () => {
      return getOrder();
    },
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const newCityRef = doc(
        collection(db, props.state < 2 ? 'done' : 'order')
      );
      await setDoc(newCityRef, props.data);
      const newCityRefa = doc(
        db,
        props.state < 2 ? 'order' : 'done',
        props?.data.id
      );

      await deleteDoc(newCityRefa);
      // deleteDoc(newCityRefa)
      //   .then(() => {
      //     console.log('Entire Document has been deleted successfully.');
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      handleClose();
    },
  });

  if (mutation.isSuccess) {
    refetchDone();
    refetchRow();
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
