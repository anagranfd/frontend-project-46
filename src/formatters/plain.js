import _ from 'lodash';

const plainDiff = (d1, d2) => {
  const iter = (data1, data2, path = []) => {
    const filesDifference = Object.entries(data2).map(([key2, value2]) => {
      const value1 = data1[key2];
      const currentPath = [...path, key2];

      // nested
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return iter(value1, value2, currentPath);
      }

      // updated with str (was obj)
      if (typeof value1 === 'object' && typeof value2 !== 'object' && value2) {
        const res = `Property ${currentPath.join(
          '.',
        )} was updated. From [complex value] to '${value2}'`;
        return res;
      }

      // updated with obj
      if (typeof value1 !== 'object' && typeof value2 === 'object' && value1) {
        const res = `Property ${currentPath.join(
          '.',
        )} was updated. From ${value1} to ${
          value2 === null ? null : '[complex value]'
        }`;
        return res;
      }

      // updated
      if ((value1 || value1 === '') && value1 !== value2) {
        const res = `Property ${currentPath.join(
          '.',
        )} was updated. From '${value1}' to '${value2}'`;
        return res;
      }

      // added obj
      if (
        !Object.values(data1).includes(value2)
        && Object.values(data2).includes(value2)
        && typeof value2 === 'object'
      ) {
        const res = `Property ${currentPath.join(
          '.',
        )} was added with value: [complex value]`;
        return res;
      }

      // added
      if (
        !Object.values(data1).includes(value2)
        && Object.values(data2).includes(value2)
      ) {
        const res = `Property ${currentPath.join('.')} was added with value: ${
          typeof value2 === 'string' ? `'${value2}'` : value2
        }`;
        return res;
      }

      // without updates
      return null;
    });

    // removed
    const removedData = Object.entries(data1)
      .filter(([key1]) => !Object.keys(data2).includes(key1))
      .map(([key1]) => {
        const currentPath = [...path, key1];
        const res = `Property ${currentPath.join('.')} was removed`;
        return res;
      });

    const result = _.flatMapDeep([...filesDifference, ...removedData]).filter(
      (item) => item !== null,
    );

    return result;
  };

  return iter(d1, d2).join('\n');
};

export default plainDiff;
