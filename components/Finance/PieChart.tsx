import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getProductSum } from '@/pages/api/financeApi';
import { useQuery } from '@tanstack/react-query';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PieChart() {
  const { data: dataPie } = useQuery({
    queryKey: ['product'],
    queryFn: () => {
      return getProductSum();
    },
    initialData: [],
  });

  const productSum = () => {
    return dataPie?.reduce((e: any, b: any) => {
      return e + parseInt(b.count);
    }, 0);
  };
  const pieData = dataPie.map(
    (e: any) => Math.round((parseInt(e.count) / productSum()) * 100 * 10) / 10
  );

  useEffect(() => {});
  const data = {
    labels: ['CM', 'FC', 'FM', 'Bundle CM', 'Bundle FM', 'Bundle GN', 'GN'],
    datasets: [
      {
        label: '# of Votes',
        data: pieData,
        borderWidth: 1,
        backgroundColor: [
          '#63B8F1',
          '#d52941',
          '#4BAC53',
          'rgba(255, 159, 64, 0.2)',
          'yellow',
          '#A020F0',
        ],
        borderColor: [
          '#63B8F1',
          '#d52941',
          'rgba(75, 192, 192, 1)',

          'rgba(255, 159, 64, 0.2)',
          'yellow',
          '#A020F0',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: 'black',
        formatter: (value: any) => {
          return value + '%';
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PieChart;
