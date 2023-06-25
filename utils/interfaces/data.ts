import note from '../types/note';
import order from '../types/order';

export default interface dataType {
  address: string;
  id: string;
  isItemExist: boolean;
  isLastItemExist: boolean;
  name: string;
  note: Array<note>;
  number: number;
  order: Array<order>;
  date: any;
}
