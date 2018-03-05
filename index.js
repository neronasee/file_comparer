const lineReader = require('./lineReader');
const diff = require('./core');
const createView = require('./createView');

const comparer = async (path1, path2) => {
  const { newFile, oldFile } = await lineReader([
    { path: path1, name: 'oldFile' },
    { path: path2, name: 'newFile' },
  ]);

  return createView(diff(oldFile, newFile));
};

module.exports = comparer;

// main func test
comparer('./old_file.txt', './new_file.txt').then(res => {
  console.log(res);
});
