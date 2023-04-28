import dataType from './data';

export default interface CollapseProps {
  data: Array<dataType>;
  state: number;
  page: number;
  isFetching: boolean;
}
