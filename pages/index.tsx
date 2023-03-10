import { auth, db } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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

//   const auth = getAuth();

//   const docSnap = await getDocs(query(collection(db, 'order'), limit(2)));
//   const data = docSnap.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
//   });

//   const docSnapDone = await getDocs(query(collection(db, 'done'), limit(2)));
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
