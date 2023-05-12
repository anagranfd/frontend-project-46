// import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';

import parser from './parsers/parser.js';
// import stylish from './formatters/stylish.js';
// import plain from './formatters/plain.js';
import formatter from './formatters/index.js';
import createTree from './createTree.js';

// Create a full path from root path and filepath
const getFullPath = (filepath) => path.resolve(cwd(), filepath);

// Generate diff string from two passed objects
const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // Create a full path from root path and filepath1
  const fullPath1 = getFullPath(filepath1);

  // Create a full path from root path and filepath2
  const fullPath2 = getFullPath(filepath2);

  // Get file1 data, read it as a string
  const fileData1 = readFileSync(fullPath1, 'utf8');

  // Get file2 data, read it as a string
  const fileData2 = readFileSync(fullPath2, 'utf8');

  const formatFile1 = path.extname(fullPath1);
  const formatFile2 = path.extname(fullPath2);

  // ------------------------------------
  // Create a file3 with file1 & file 2 diff
  // parse fileData1, fileData2
  const parsedFileData1 = parser(formatFile1, fileData1);

  const parsedFileData2 = parser(formatFile2, fileData2);

  const diff = createTree(parsedFileData1, parsedFileData2);

  // Create filesDifference obj: Compare key: value of fileData1, parsedFileData2
  const result = formatter(diff, formatName);

  return result;
  // -----------------------------------
};

export default gendiff;
