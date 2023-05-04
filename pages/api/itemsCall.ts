import axios from 'axios';

const getOrder = async (page: number) => {
  const result = await axios.get(
    `http://localhost:8500/order/getOrder/false/${page}`,
    {
      withCredentials: true,
    }
  );

  return result.data.data;
};

const getFinishOrder = async (page: number) => {
  const result = await axios.get(
    `http://localhost:8500/order/getOrder/true/${page}`,
    {
      withCredentials: true,
    }
  );

  return result.data.data;
};

const getDetail = async (customer_id: any) => {
  const { data } = await axios.get(
    `http://localhost:8500/order/detail/${customer_id}`,
    { withCredentials: true }
  );

  return data.data;
};

const getUser = async () => {
  try {
    const result = await axios.get('http://localhost:8500/auth/user', {
      withCredentials: true,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const finishOrder = async (id: string) => {
  try {
    const res = await axios({
      method: 'put',
      url: 'http://localhost:8500/order/finishOrder',
      withCredentials: true,
      data: {
        order_id: id,
      },
    });
    console.log(res);
  } catch (error) {}
};

const revokeFinishOrder = async (id: string) => {
  try {
    const res = await axios({
      method: 'put',
      url: 'http://localhost:8500/order/revokeFinishOrder',
      withCredentials: true,
      data: {
        order_id: id,
      },
    });
    console.log(res);
  } catch (error) {}
};

export {
  getOrder,
  getDetail,
  getUser,
  finishOrder,
  getFinishOrder,
  revokeFinishOrder,
};
