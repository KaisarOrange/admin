import { db } from '@/firebaseConfig';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  startAt,
} from 'firebase/firestore';

let prevOrderdoc: any;
let prevDoneOrderdoc: any;

let prevLastOrderdoc: any;
let prevLastDoneOrderdoc: any;

let currentPage: number = 0;
let itemCount: number = 0;

const getOrder = async (page: number = 0, path: string) => {
  if (page === 0) {
    currentPage = 0;
  }

  const next: boolean = currentPage < page;
  const prev: boolean = currentPage > page;

  if (next === true) {
    const docSnap = await getDocs(
      query(
        collection(db, path),
        startAfter(path === 'order' ? prevLastOrderdoc : prevLastDoneOrderdoc),
        limit(5)
      )
    );

    path === 'order'
      ? (prevLastOrderdoc = docSnap.docs[docSnap.docs.length - 1])
      : (prevLastDoneOrderdoc = docSnap.docs[docSnap.docs.length - 1]);

    const doca = await getDocs(query(collection(db, path)));

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;

      doca.docs[0].id === doc.id ? (isItemExist = true) : 'log';
      doca.docs[doca.size - 1].id === doc.id ? (isLastItemExist = true) : 'log';

      itemCount += 1;

      return {
        ...doc.data(),
        id: doc.id,
        isItemExist: isItemExist,
        isLastItemExist: isLastItemExist,
      };
    });

    currentPage = page;

    return data;
  } else if (prev === true) {
    let count: number = 0;

    const docSnap = await getDocs(
      query(
        collection(db, path),
        startAt(path === 'order' ? prevOrderdoc : prevDoneOrderdoc),
        limit(5)
      )
    );
    path === 'order'
      ? (prevLastOrderdoc = docSnap.docs[docSnap.docs.length - 1])
      : (prevLastDoneOrderdoc = docSnap.docs[docSnap.docs.length - 1]);
    const firsta = query(collection(db, path));
    const doca = await getDocs(firsta);

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;

      doca.docs[0].id === doc.id ? (isItemExist = true) : 'log';
      doca.docs[doca.size - 1].id === doc.id ? (isLastItemExist = true) : 'log';

      itemCount += 1;

      return {
        ...doc.data(),
        id: doc.id,
        isItemExist: isItemExist,
        isLastItemExist: isLastItemExist,
      };
    });
    itemCount = itemCount - (itemCount - count);

    currentPage = page;

    return data;
  } else {
    const doca = await getDocs(query(collection(db, path)));

    const docSnap = await getDocs(query(collection(db, path), limit(5)));

    path === 'order'
      ? (prevOrderdoc = docSnap.docs[0])
      : (prevDoneOrderdoc = docSnap.docs[0]);

    path === 'order'
      ? (prevLastOrderdoc = docSnap.docs[docSnap.docs.length - 1])
      : (prevLastDoneOrderdoc = docSnap.docs[docSnap.docs.length - 1]);

    const data = docSnap.docs.map((doc) => {
      let isItemExist: boolean = false;
      let isLastItemExist: boolean = false;

      docSnap.docs[0].id === doc.id ? (isItemExist = true) : 'log';
      doca.docs[doca.size - 1].id === doc.id ? (isLastItemExist = true) : 'log';

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

export { getOrder };
