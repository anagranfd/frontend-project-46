// import * as fs from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Create a full path from root path and filepath
const getFullPath = (filepath) => resolve(cwd(), filepath);

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

  // Create a file3 with file1 & file 2 diff
  const filesDiff = (data1, data2) => {
    // parse fileData1 JSON
    const parsedFileData1 = JSON.parse(data1);

    // parse fileData2 JSON
    const parsedFileData2 = JSON.parse(data2);

    // Create filesDifference obj: Compare key: value of fileData1, parsedFileData2
    const filesDifference = Object.entries(parsedFileData2).reduce(
      (accDiff, [key2, value2]) => {
        // if parsedFileData1 contents key, but the value is updated
        // with parsedFileData2 value (updated)
        if (parsedFileData1[key2] && parsedFileData1[key2] !== value2) {
          return [
            ...accDiff,
            `  - ${key2}: ${parsedFileData1[key2]}`,
            `  + ${key2}: ${value2}`,
          ];
        }

        // if parsedFileData1 contents key, but the value is the same
        // as parsedFileData2 value (without updates)
        if (parsedFileData1[key2] && parsedFileData1[key2] === value2) {
          return [...accDiff, `    ${key2}: ${parsedFileData1[key2]}`];
        }

        // if parsedFileData1 doesn't content key, but parsedFileData2 does (added)
        if (!parsedFileData1[key2] && value2) {
          return [...accDiff, `  + ${key2}: ${value2}`];
        }

        return [...accDiff];
      },
      [],
    );

    // if parsedFileData1 contents key, but parsedFileData2 doesn't (removed)
    const removedData = Object.entries(parsedFileData1)
      .filter(([key1]) => !parsedFileData2[key1])
      .map(([key1, value1]) => [`  - ${key1}: ${value1}`]);

    // Combine a result
    const result = `{\n${[...removedData, ...filesDifference].join('\n')}\n}`;

    return result;
  };

  return filesDiff(fileData1, fileData2);
};

export default gendiff;
