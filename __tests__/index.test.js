/* eslint-env jest */

import path from 'path';
import gendiff from '../src/index.js';

const result = `{\n${[
  '  - proxy: 123.234.53.22',
  '  - follow: false',
  '  - timeout: 50',
  '  + timeout: 20',
  '  + verbose: true',
  '    host: hexlet.io',
].join('\n')}\n}`;

// eslint-disable-next-line no-underscore-dangle
const dirname = path.resolve();

test('json', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.json');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.json');

  expect(gendiff(file1Path, file2Path)).toEqual(result);
});

test('yml', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.yml');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.yml');

  expect(gendiff(file1Path, file2Path)).toEqual(result);
});

test('yaml', () => {
  const file1Path = path.join(dirname, '__fixtures__', 'file1.yaml');
  const file2Path = path.join(dirname, '__fixtures__', 'file2.yaml');

  expect(gendiff(file1Path, file2Path)).toEqual(result);
});
