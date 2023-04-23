/* eslint-env jest */

import path from 'path';
import gendiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const dirname = path.resolve();

const file1Path = path.join(dirname, '__fixtures__', 'file1.json');
const file2Path = path.join(dirname, '__fixtures__', 'file2.json');

test('gendiff', () => {
  expect(gendiff(file1Path, file2Path)).toEqual(
    `{\n${[
      '  - proxy: 123.234.53.22',
      '  - follow: false',
      '  - timeout: 50',
      '  + timeout: 20',
      '  + verbose: true',
      '    host: hexlet.io',
    ].join('\n')}\n}`,
  );
});
