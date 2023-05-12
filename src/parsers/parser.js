import yaml from 'js-yaml';

const parser = (format, data) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`'Wrong format! ${format}'`);
  }
};

export default parser;
