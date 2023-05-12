import _ from 'lodash';

const createTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: createTree(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: data1[key],
    };
  });
  return result;
};

export default createTree;
