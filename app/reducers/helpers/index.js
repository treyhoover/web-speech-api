export function setArrayIndexValue(array, index, value) {
  return array
    .slice(0, index)
    .concat(value)
    .concat(array.slice(index + 1));
}
