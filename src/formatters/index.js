import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(
        `${formatName} format is not supported.\nPlease choose one of formats: stylish, plain, json`,
      );
  }
};

export default formatter;
