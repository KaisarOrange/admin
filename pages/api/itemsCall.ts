import { db } from '@/firebaseConfig';
import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

let lastdoc: any;
let prevdoc: any;
let currentPage: number = 0;
let itemCount: number = 0;

const getOrder = async (page: number = 0) => {
  const next: boolean = currentPage < page;
  const prev: boolean = currentPage > page;
  //  const lastVisible = docSnap.docs[docSnap.docs.length - 1];

  if (next === true) {
    const next = query(collection(db, 'order'), startAfter(lastdoc), limit(5));
    const docSnap = await getDocs(next);

    lastdoc = docSnap.docs[docSnap.docs.length - 1];

    const data = docSnap.docs.map((doc) => {
      itemCount += 1;
      return { ...doc.data(), id: doc.id };
    });
    console.log('itemCount: ', itemCount);

    currentPage = page;

    return data;
  } else if (prev === true) {
    let count: number = 0;
    console.log(prevdoc.id);
    const next = query(collection(db, 'order'), startAt(prevdoc), limit(5));
    const docSnap = await getDocs(next);

    lastdoc = docSnap.docs[docSnap.docs.length - 1];

    const data = docSnap.docs.map((doc) => {
      count += 1;
      return { ...doc.data(), id: doc.id };
    });
    itemCount = itemCount - (itemCount - count);
    console.log('itemCount: ', itemCount);
    currentPage = page;

    return data;
  } else {
    const first = query(collection(db, 'order'), limit(5));
    const docSnap = await getDocs(first);

    prevdoc = docSnap.docs[docSnap.docs.length - 5];
    lastdoc = docSnap.docs[docSnap.docs.length - 1];
    console.log('prev: ', prevdoc.id);
    const data = docSnap.docs.map((doc) => {
      itemCount += 1;
      return { ...doc.data(), id: doc.id };
    });
    return data;
  }
};

const isTrue = async () => {
  const docSnapa = await getDocs(collection(db, 'order'));

  return docSnapa.size === itemCount;
};

const getDoneOrder = async () => {
  const docSnap = await getDocs(collection(db, 'done'));
  const data = docSnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  const lastVisible = docSnap.docs[docSnap.docs.length - 1];

  return data;
};

export { getOrder, getDoneOrder, isTrue };
