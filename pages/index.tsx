import { db } from '@/firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import React from 'react';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';

import Menu from './components/Menu';

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const first = query(collection(db, 'order'), limit(5));
  const docSnap = await getDocs(first);
  const data = docSnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  const firstDone = query(collection(db, 'order'), limit(5));
  const docSnapDone = await getDocs(firstDone);
  const dataDone = docSnapDone.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return {
    props: {
      orderData: data,
      doneData: dataDone,
    },
  };
}

function Index({ orderData, doneData }: any) {
  return (
    <>
      <Menu orderData={orderData} doneData={doneData} />
    </>
  );
}

export default Index;
