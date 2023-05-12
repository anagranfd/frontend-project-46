const stringify = (data) => {
  if (typeof data === 'object' || data !== null) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return `${data}`;
};

const getFullPath = (node, currentPath) => {
  if (currentPath !== '') {
    return `${currentPath}.${node.key}`;
  }
  return `${node.key}`;
};

const iter = (diff, path) => diff
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const currentPath = getFullPath(node, path);
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(
          node.value,
        )}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(
          node.value1,
        )} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, currentPath).join('\n');
      default:
        return null;
    }
  });

const plainDiff = (tree) => iter(tree, '').join('\n');

export default plainDiff;
