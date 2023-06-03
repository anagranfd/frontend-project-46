// import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';

import parser from './parsers/parser.js';
import formatter from './formatters/index.js';
import createTree from './createTree.js';

const getFullPath = (filepath) => path.resolve(cwd(), filepath);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fullPath1 = getFullPath(filepath1);

  const fullPath2 = getFullPath(filepath2);

  const fileData1 = readFileSync(fullPath1, 'utf8');

  const fileData2 = readFileSync(fullPath2, 'utf8');

  const formatFile1 = path.extname(fullPath1).substring(1);
  const formatFile2 = path.extname(fullPath2).substring(1);

  const parsedFileData1 = parser(formatFile1, fileData1);

  const parsedFileData2 = parser(formatFile2, fileData2);

  const diff = createTree(parsedFileData1, parsedFileData2);

  const result = formatter(diff, formatName);

  return result;
};

export default gendiff;
