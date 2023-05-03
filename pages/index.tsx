import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import { getOrder, getUser } from './api/itemsCall';
import { useQuery } from '@tanstack/react-query';

function Index() {
  return (
    <>
      <Menu />
    </>
  );
}

export default Index;
