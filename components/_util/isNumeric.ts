const isNumeric = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export default isNumeric;
