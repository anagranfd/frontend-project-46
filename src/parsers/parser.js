import path from 'path';
import yaml from 'js-yaml';

const parser = (path1, data1, data2) => {
  if (path.extname(path1) === '.json') {
    // parse fileData1 JSON
    const parsedFileData1 = JSON.parse(data1);

    // parse fileData2 JSON
    const parsedFileData2 = JSON.parse(data2);

    return [parsedFileData1, parsedFileData2];
  }
  if (path.extname(path1) === '.yml' || path.extname(path1) === '.yaml') {
    // parse fileData1 yml
    const parsedFileData1 = yaml.load(data1);

    // parse fileData2 yml
    const parsedFileData2 = yaml.load(data2);

    return [parsedFileData1, parsedFileData2];
  }

  return [data1, data2];
};

export default parser;
