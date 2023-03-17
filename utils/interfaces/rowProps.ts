import dataType from './data';

export default interface rowProps {
  row: dataType;
  i: number;
  state: number;
  page: number;
  isFetching: boolean;
}
