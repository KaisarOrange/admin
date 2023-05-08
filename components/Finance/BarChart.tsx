import React from 'react';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function BarChart({ data }: any) {
  return (
    <Box>
      <Bar data={data} />
    </Box>
  );
}

export default BarChart;
