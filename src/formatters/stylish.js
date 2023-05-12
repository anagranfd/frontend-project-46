const filesDiff = (diff) => {
  const spacesCount = 4;
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
      return `${data}`;
    }
    const lines = Object.entries(data).map(
      ([key, value]) => `${getBiggerSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
    );
    return `{\n${lines.join('\n')}\n${getBiggerSpaces(depth)}}`;
  };

  const iter = (diffTree, depth = 1) => diffTree.map((item) => {
    switch (item.type) {
      case 'removed':
        return `${getSpaces(depth)}- ${item.key}: ${stringify(
          item.value,
          depth,
        )}`;
      case 'added':
        return `${getSpaces(depth)}+ ${item.key}: ${stringify(
          item.value,
          depth,
        )}`;
      case 'changed': {
        return `${getSpaces(depth)}- ${item.key}: ${stringify(
          item.value1,
          depth,
        )}\n${getSpaces(depth)}+ ${item.key}: ${stringify(
          item.value2,
          depth,
        )}`;
      }
      case 'unchanged':
        return `${getBiggerSpaces(depth)}${item.key}: ${stringify(
          item.value,
          depth,
        )}`;
      case 'nested': {
        const lines = iter(item.children, depth + 1);
        return `${getBiggerSpaces(depth)}${item.key}: {\n${lines.join(
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

export default filesDiff;
