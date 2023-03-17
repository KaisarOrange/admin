import dataType from './data';

export default interface mainComponentProps {
  state: number;
  page: number;
  open: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setState: React.Dispatch<React.SetStateAction<number>>;
}
