import dataType from './data';

export default interface CollapseProps {
  data: Array<dataType>;
  dataDone: Array<dataType>;
  state: number;
  page: number;
  isFetching: boolean;
}
