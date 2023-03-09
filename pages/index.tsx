import React, { useEffect } from 'react';
import Menu from './components/Menu';

function Index({ orderData, doneData, hello }: any) {
  useEffect(() => {}, []);

  return (
    <>
      <Menu orderData={orderData} doneData={doneData} hello={hello} />
      {/* <Menu orderData={orderData} doneData={doneData} hello={hello} /> */}
    </>
  );
}

export default Index;

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library

//   const docSnap = await getDocs(query(collection(db, 'order'), limit(5)));
//   const data = docSnap.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
//   });

//   const docSnapDone = await getDocs(query(collection(db, 'done'), limit(5)));
//   const dataDone = docSnapDone.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
//   });

//   return {
//     props: {
//       orderData: data,
//       doneData: dataDone,
//     },
//   };
// }
