import axios from 'axios';

const getOrder = async () => {
  const result = await axios.get('http://localhost:8500/order');

  return result.data.data;
};

const getDetail = async () => {
  const { data } = await axios.get('http://localhost:8500/order/detail');

  return data.data;
};

export { getOrder, getDetail };
