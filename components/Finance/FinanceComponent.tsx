import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import PieChart from './PieChart';
import BarChart from './BarChart';
import Main from '../Main/Main';
import mainComponentProps from '@/utils/interfaces/mainComponentProps';
import {
  getProductSum,
  getTotalOrderedProduct,
  getTotalRevenue,
} from '@/pages/api/financeApi';
import { useQuery } from '@tanstack/react-query';
import converter from './converter';

function FinanceComponent({ open }: mainComponentProps) {
  const data = [
    { name: 'Alif', price: '50.000', date: '10/05/2023' },
    { name: 'Jason', price: '80.000', date: '05/07/2023' },
    { name: 'Bobby', price: '90.000', date: '02/09/2023' },
    { name: 'Azka', price: '30.0000', date: '17/10/2023' },
  ];

  const dataBar = {
    labels: ['Januari', 'febuari', 'Maret', 'juni'],
    datasets: [
      {
        label: 'Omset',
        data: [60, 100, 200, 400],
        borderWidth: 1,
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)'],
      },
      {
        label: 'Bersih',
        data: [30, 50, 100, 200],
        borderWidth: 1,
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
      },
    ],
  };

  const dataBebanBar = {
    labels: ['Januari', 'febuari', 'Maret', 'juni'],
    datasets: [
      {
        label: 'Beban pokok',
        data: [30, 50, 100, 200],
        borderWidth: 1,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
      },
    ],
  };

  const { data: revenueData } = useQuery({
    queryKey: ['revenue'],
    queryFn: () => {
      return getTotalRevenue();
    },
    initialData: [],
  });

  const { data: totalOrderedData } = useQuery({
    queryKey: ['totalorder'],
    queryFn: () => {
      return getTotalOrderedProduct();
    },
    initialData: [],
  });

  useEffect(() => {});
  return (
    <Main open={open}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '200px',
          marginTop: '100px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <Box
            sx={{
              backgroundColor: '#FCD581',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <PieChart />
          </Box>
          <Box
            sx={{
              backgroundColor: '#FCD581',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px',
              }}
            >
              <Typography fontWeight={{ fontWeight: 'bold' }}>
                Recent payments
              </Typography>
              <Typography fontWeight={{ fontWeight: 'bold' }} color={'gray'}>
                See All
              </Typography>
            </Box>
            {data.map((e, i) => {
              return (
                <Box
                  key={i + e.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: '10px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '10px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontWeight={'bold'}>{e.name}</Typography>
                    <Typography>{e.date}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={'bold'}>+{e.price} IDR</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '20px',

              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#5BC0EB',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '25px',
              }}
            >
              <Typography>Omset</Typography>

              <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
                Rp. {converter(revenueData[0].total_price)}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#9bc53d',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '25px',
              }}
            >
              <Typography>Kas</Typography>

              <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
                Rp. 1.000.000
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#F7C44C',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '25px',
              }}
            >
              <Typography>Total Orders</Typography>

              <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
                {totalOrderedData[0].total_order}
              </Typography>
            </Box>
          </Box>
          <BarChart data={dataBar} />
          <BarChart data={dataBebanBar} />
        </Box>
      </Box>
    </Main>
  );
}

export default FinanceComponent;
