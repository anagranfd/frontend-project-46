import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data1, data2, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(data1, data2);
    case 'stylish':
      return stylish(data1, data2);
    case 'json':
      return json(data1, data2);
    default:
      return stylish(data1, data2);
  }
};

export default formatter;