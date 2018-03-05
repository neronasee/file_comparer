const fs = require('fs');
const lineReader = require('readline');

module.exports = files =>
  new Promise((resolve, reject) => {
    let completedTasks = 0;
    const result = {};

    files.forEach(file => {
      const { path, name } = file;
      result[name] = [];

      const readerTask = lineReader.createInterface({
        input: fs.createReadStream(path),
      });

      readerTask.on('line', function(line) {
        result[name].push(line);
      });

      readerTask.on('close', () => {
        ++completedTasks === files.length && resolve(result);
      });
    });
  });
