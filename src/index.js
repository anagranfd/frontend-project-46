// import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';

import parser from './parsers/parser.js';
import stylish from './parsers/stylish.js';

// Create a full path from root path and filepath
const getFullPath = (filepath) => path.resolve(cwd(), filepath);

// Generate diff string from two passed objects
const gendiff = (filepath1, filepath2) => {
  // Create a full path from root path and filepath1
  const fullPath1 = getFullPath(filepath1);

  // Create a full path from root path and filepath2
  const fullPath2 = getFullPath(filepath2);

  // Get file1 data, read it as a string
  const fileData1 = readFileSync(fullPath1, 'utf8');

  // Get file2 data, read it as a string
  const fileData2 = readFileSync(fullPath2, 'utf8');

  // ------------------------------------
  // Create a file3 with file1 & file 2 diff
  // parse fileData1, fileData2
  const [parsedFileData1, parsedFileData2] = parser(
    fullPath1,
    fileData1,
    fileData2,
  );

  // Create filesDifference obj: Compare key: value of fileData1, parsedFileData2
  const result = stylish(parsedFileData1, parsedFileData2);

  return result;
  // -----------------------------------
};

export default gendiff;
