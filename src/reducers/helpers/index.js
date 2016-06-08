export function setArrayIndexValue(array, index, value) {
  return array
    .slice(0, index)
    .concat(value)
    .concat(array.slice(index + 1));
}

export function removeArrayIndexValue(array, index) {
  return array
    .slice(0, index)
    .concat(array.slice(index + 1));
}