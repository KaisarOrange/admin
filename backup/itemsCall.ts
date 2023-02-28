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

const isTrue = async () => {
  const docSnapa = await getDocs(collection(db, 'order'));

  return {
    isTrueOrNot: docSnapa.size === itemCount,
    firstItem: docSnapa.docs[0].data(),
  };
};

const getOrder = async (page: number = 0) => {
  const next: boolean = currentPage < page;
  const prev: boolean = currentPage > page;
  //  const lastVisible = docSnap.docs[docSnap.docs.length - 1];

  if (next === true) {
    const next = query(collection(db, 'order'), startAfter(lastdoc), limit(5));
    const firDoct = await getDocs(collection(db, 'order'));
    const docSnap = await getDocs(next);
    const firsta = query(collection(db, 'order'));
    const doca = await getDocs(firsta);
    lastdoc = docSnap.docs[docSnap.docs.length - 1];

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;

      doca.docs[0].data().id === doc.data().id ? (isItemExist = true) : 'log';
      doca.docs[doca.size - 1].data().id === doc.data().id
        ? (isLastItemExist = true)
        : 'log';

      itemCount += 1;

      return {
        ...doc.data(),
        id: doc.id,
        isItemExist: isItemExist,
        isLastItemExist: isLastItemExist,
      };
    });
    console.log('itemCount: ', itemCount);

    currentPage = page;

    return data;
  } else if (prev === true) {
    let count: number = 0;
    const firDoct = await getDocs(collection(db, 'order'));
    console.log(prevdoc.id);
    const next = query(collection(db, 'order'), startAt(prevdoc), limit(5));
    const docSnap = await getDocs(next);
    const firsta = query(collection(db, 'order'));
    const doca = await getDocs(firsta);
    lastdoc = docSnap.docs[docSnap.docs.length - 1];

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;

      doca.docs[0].data().id === doc.data().id ? (isItemExist = true) : 'log';
      doca.docs[doca.size - 1].data().id === doc.data().id
        ? (isLastItemExist = true)
        : 'log';

      itemCount += 1;

      return {
        ...doc.data(),
        id: doc.id,
        isItemExist: isItemExist,
        isLastItemExist: isLastItemExist,
      };
    });
    itemCount = itemCount - (itemCount - count);
    console.log('itemCount: ', itemCount);
    currentPage = page;

    return data;
  } else {
    const firsta = query(collection(db, 'order'));
    const doca = await getDocs(firsta);

    console.log('hello ');
    const first = query(collection(db, 'order'), limit(5));
    const docSnap = await getDocs(first);

    prevdoc = docSnap.docs[docSnap.docs.length - 5];
    lastdoc = docSnap.docs[docSnap.docs.length - 1];

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;
      docSnap.docs[0].data().name === doc.data().name
        ? (isItemExist = true)
        : 'log';

      docSnap.docs[0].data().name === doc.data().name
        ? (isItemExist = true)
        : 'log';
      doca.docs[doca.size - 1].data().id === doc.data().id
        ? (isLastItemExist = true)
        : 'log';

      itemCount += 1;

      return {
        ...doc.data(),
        id: doc.id,
        isItemExist: isItemExist,
        isLastItemExist: isLastItemExist,
      };
    });
    return data;
  }
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
//doca.docs[doca.size - 1].data()
