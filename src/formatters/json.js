const diffToJson = (d1, d2) => {
  const spacesCount = 2;
  const replacer = ' ';

  const getSpaces = (depth) => {
    const indentSize = depth * spacesCount;
    return replacer.repeat(indentSize - 2);
  };

  const getBiggerSpaces = (depth) => {
    const indentSize = depth * spacesCount;
    return replacer.repeat(indentSize);
  };

  const stringify = (data, depth) => {
    if (typeof data !== 'object' || data === null) {
      return `${typeof data === 'string' ? `"${data}"` : data}`;
    }
    const lines = Object.entries(data).map(
      ([key, value]) => `${getBiggerSpaces(depth + 1)}"${key}": ${stringify(value, depth + 1)}`,
    );
    return `{\n${lines.join('\n')}\n${getBiggerSpaces(depth)}}`;
  };

  const iter = (data1, data2, depth = 1) => {
    const filesDifference = Object.entries(data2).map(([key2, value2]) => {
      const value1 = data1[key2];

      // nested
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        const getObj = iter(value1, value2, depth + 2);
        return `${getBiggerSpaces(depth)}"${key2}": {\n${getObj.join(
          '\n',
        )}\n${getBiggerSpaces(depth)}}`;
      }

      // added
      if (
        !Object.values(data1).includes(value1)
        && Object.values(data2).includes(value2)
      ) {
        return `${getSpaces(depth)}"${key2}": {\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(value2, depth)}\n${getSpaces(depth)}}`;
      }

      // updated with str (was obj)
      if (typeof value1 === 'object' && typeof value2 !== 'object' && value2) {
        return `${getSpaces(depth)}"${key2}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(value1, depth)}\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(value2, depth)}\n${getSpaces(depth)}}`;
      }

      // updated with obj
      if (typeof value1 !== 'object' && typeof value2 === 'object' && value2) {
        return `${getSpaces(depth)}"${key2}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(value1, depth)}\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(value2, depth)}\n${getSpaces(depth)}}`;
      }

      // updated
      if ((value1 || value1 === '') && value1 !== value2) {
        return `${getSpaces(depth)}"${key2}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(value1, depth)}\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(value2, depth)}\n${getSpaces(depth)}}`;
      }

      // without updates
      return `${getSpaces(depth)}"${key2}": ${stringify(value1, depth)}`;
    });

    // removed
    const removedData = Object.entries(data1)
      .filter(([key1]) => !Object.keys(data2).includes(key1))
      .map(([key1, value1]) => [
        `${getSpaces(depth)}"${key1}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(value1, depth)}\n${getSpaces(depth)}}`,
      ]);

    const result = [...filesDifference, ...removedData];

    return result;
  };

  const str = iter(d1, d2, 2);

  return `{\n${str.join('\n')}\n}`;
};

export default diffToJson;
