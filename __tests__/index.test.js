/* eslint-env jest */

import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const dirname = path.resolve();

const outputFilePath = path.join(dirname, '__fixtures__', 'filesDiff.txt');
const outputFile = readFileSync(outputFilePath, 'utf8');

test('json', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.json');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.json');

  expect(gendiff(file1Path, file2Path)).toEqual(outputFile);
});

test('yml', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.yml');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.yml');

  expect(gendiff(file1Path, file2Path)).toEqual(outputFile);
});

test('yaml', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.yaml');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.yaml');

  expect(gendiff(file1Path, file2Path)).toEqual(outputFile);
});
