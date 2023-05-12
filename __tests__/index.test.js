/* eslint-env jest */

import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const dirname = path.resolve();

const outputFilePath = path.join(dirname, '__fixtures__', 'filesDiff.txt');
const outputFile = readFileSync(outputFilePath, 'utf8');

const outputFilePathPlain = path.join(dirname, '__fixtures__', 'plainDiff.txt');
const outputFilePlain = readFileSync(outputFilePathPlain, 'utf8');

const outputFilePathJson = path.join(dirname, '__fixtures__', 'jsonDiff.txt');
const outputFileJson = readFileSync(outputFilePathJson, 'utf8');

const file1Path = path.join(dirname, '__fixtures__', 'file1.json');
const file2Path = path.join(dirname, '__fixtures__', 'file2.json');
const file3Path = path.join(dirname, '__fixtures__', 'file1.yaml');
const file4Path = path.join(dirname, '__fixtures__', 'file2.yaml');

describe('filesDiff', () => {
  test('formats', () => {
    expect(gendiff(file1Path, file2Path)).toEqual(outputFile);
    expect(gendiff(file1Path, file2Path, 'stylish')).toEqual(outputFile);
    expect(gendiff(file3Path, file4Path, 'plain')).toEqual(outputFilePlain);
    expect(gendiff(file3Path, file4Path, 'json')).toEqual(outputFileJson);
  });
});
