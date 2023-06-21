const converter = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export default converter;
