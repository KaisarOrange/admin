import axios from 'axios';

const getProductSum = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://pastaboys-backend-production.up.railway.app/finance/getProductSum',
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {}
};

const getTotalRevenue = async () => {
  try {
    const res = await axios(
      'https://pastaboys-backend-production.up.railway.app/finance/getTotalSumRevenue',
      { withCredentials: true }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getTotalOrderedProduct = async () => {
  try {
    const res = await axios(
      'https://pastaboys-backend-production.up.railway.app/finance/getTotalOrderedProduct',
      { withCredentials: true }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getProductSum, getTotalRevenue, getTotalOrderedProduct };
