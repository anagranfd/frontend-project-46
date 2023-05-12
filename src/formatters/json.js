const diffToJson = (diff) => {
  const spacesCount = 4;
  const replacer = ' ';

  const getSpaces = (depth) => {
    const indentSize = depth + spacesCount;
    return replacer.repeat(indentSize - 2);
  };

  const getBiggerSpaces = (depth) => {
    const indentSize = depth + spacesCount;
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

  const iter = (diffTree, depth = 1) => diffTree.map((item) => {
    switch (item.type) {
      case 'removed':
        return `${getSpaces(depth)}"${item.key}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(item.value, depth)}\n${getSpaces(depth)}}`;
      case 'added':
        return `${getSpaces(depth)}"${item.key}": {\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(item.value, depth)}\n${getSpaces(depth)}}`;
      case 'changed': {
        return `${getSpaces(depth)}"${item.key}": {\n${getBiggerSpaces(
          depth,
        )}"-": ${stringify(item.value1, depth)}\n${getBiggerSpaces(
          depth,
        )}"+": ${stringify(item.value2, depth)}\n${getSpaces(depth)}}`;
      }
      case 'unchanged':
        return `${getSpaces(depth)}"${item.key}": ${stringify(
          item.value,
          depth,
        )}`;
      case 'nested': {
        const getObj = iter(item.children, depth + 2);
        return `${getSpaces(depth)}"${item.key}": {\n${getObj.join(
          '\n',
        )}\n${getBiggerSpaces(depth)}}`;
      }
      default:
        throw new Error(`Wrong item type: '${item.type}'.`);
    }
  });

  const str = iter(diff, 1);

  return `{\n${str.join('\n')}\n}`;
};

export default diffToJson;
