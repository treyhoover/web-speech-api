import { snakeCase, camelCase } from 'lodash';

export const buildActions = (actions = {}, action, str = '') => {
  Object.keys(action).forEach(key => {
    const newStr = snakeCase(`${str} ${key}`).toUpperCase();
    const next = action[key];
    if (typeof next === 'function') {
      const type = newStr;
      const actionCreator = (...args) => next({ ...args[0], type });
      Object.assign(actions, { [camelCase(newStr)]: actionCreator });
    } else if (typeof next !== 'object') {
      console.error('invalid actionTypes structure');
    } else {
      buildActions(actions, next, newStr);
    }
  });

  return actions;
};

export const defaultAction = ({ type }) => ({ type });