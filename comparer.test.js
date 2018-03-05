const path = require('path');
const diff = require('./core');
const lineReader = require('./lineReader');

test('properly reads data from the files', async () => {
  const path1 = path.resolve('./old_file.txt');
  const path2 = path.resolve('./new_file.txt');

  const { newFile, oldFile } = await lineReader([
    { path: path1, name: 'oldFile' },
    { path: path2, name: 'newFile' },
  ]);

  expect(newFile).toEqual(['Another', 'Text', 'File', 'With', 'Additional', 'Lines']);
  expect(oldFile).toEqual(['Some', 'Simple', 'Text', 'File']);
});

test('diff core function returns proper data', () => {
  const oldFile = ['Some', 'Simple', 'Text', 'File'];
  const newFile = ['Another', 'Text', 'File', 'With', 'Additional', 'Lines'];

  const result = diff(oldFile, newFile);

  const expectedStructure = [
    { data: 'Some', sign: '-' },
    { data: 'Simple', sign: '-' },
    { data: 'Another', sign: '+' },
    { data: 'Text', sign: ' ' },
    { data: 'File', sign: ' ' },
    { data: 'With', sign: '+' },
    { data: 'Additional', sign: '+' },
    { data: 'Lines', sign: '+' },
  ];

  expect(result).toEqual(expectedStructure);
});
