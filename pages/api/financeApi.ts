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

export { getProductSum };
