import axios from 'axios';

const getProductSum = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'http://localhost:8500/finance/getProductSum',
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {}
};

export { getProductSum };
