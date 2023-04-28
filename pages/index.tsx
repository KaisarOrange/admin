import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import { getOrder } from './api/itemsCall';

function Index({ orderData }: any) {
  useEffect(() => {}, []);

  return (
    <>
      <Menu orderData={orderData} />
    </>
  );
}

export default Index;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const data = await getOrder();

  return {
    props: {
      orderData: data,
    },
  };
}
