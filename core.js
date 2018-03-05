const makeHashmap = data =>
  data.reduce((acc, line, i) => {
    if (!acc[line]) {
      acc[line] = {
        rows: [],
      };
    }
    acc[line].rows.push(i);

    return acc;
  }, {});

const prepareData = (oldFileData, newFileData) => {
  const oldMap = makeHashmap(oldFileData);
  const newMap = makeHashmap(newFileData);

  const oldResult = [...oldFileData];
  const newResult = [...newFileData];

  for (let key in newMap) {
    if (oldMap[key] && newMap[key].rows.length === 1 && oldMap[key].rows.length === 1) {
      const newFileRowNumber = newMap[key].rows[0];
      const oldFileRowNumber = oldMap[key].rows[0];

      newResult[newFileRowNumber] = {
        text: newFileData[newFileRowNumber],
        row: oldFileRowNumber,
      };
      oldResult[oldFileRowNumber] = {
        text: oldFileData[oldFileRowNumber],
        row: newFileRowNumber,
      };
    }
  }

  for (let i = 0; i < newResult.length - 1; i++) {
    if (
      newResult[i].text &&
      !newResult[i + 1].text &&
      newResult[i].row + 1 < oldResult.length &&
      !oldResult[newResult[i].row + 1].text &&
      newResult[i + 1] == oldResult[newResult[i].row + 1]
    ) {
      newResult[i + 1] = {
        text: newResult[i + 1],
        row: newResult[i].row + 1,
      };
      oldResult[newResult[i].row + 1] = {
        text: oldResult[newResult[i].row + 1],
        row: i + 1,
      };
    }
  }

  for (let i = newResult.length - 1; i > 0; i--) {
    if (
      newResult[i].text &&
      !newResult[i - 1].text &&
      newResult[i].row > 0 &&
      !oldResult[newResult[i].row - 1].text &&
      newResult[i - 1] == oldResult[newResult[i].row - 1]
    ) {
      newResult[i - 1] = { text: newResult[i - 1], row: newResult[i].row - 1 };
      oldResult[newResult[i].row - 1] = {
        text: oldResult[newResult[i].row - 1],
        row: i - 1,
      };
    }
  }
  return {
    oldResult,
    newResult,
  };
};

const makeBuilder = (source, dist) => {
  const pushDeleted = ({ from = 0, pushAll = false } = {}) => {
    if (pushAll) {
      return source.forEach(line => dist.push({ sign: '-', data: line }));
    }

    for (let i = from; i < source.length && !source[i].text; i++) {
      dist.push({ sign: '-', data: source[i] });
    }
  };

  const pushInserted = line => dist.push({ sign: '+', data: line });

  const pushTheSame = line => dist.push({ sign: ' ', data: line.text });

  return {
    pushDeleted,
    pushInserted,
    pushTheSame,
  };
};

const diff = (oldFileData, newFileData) => {
  const { oldResult: oldData, newResult: newData } = prepareData(oldFileData, newFileData);
  const builder = makeBuilder(oldData, result);
  const result = [];

  if (newData.length === 0) {
    builder.pushDeleted({ pushAll: true });
    return result;
  }

  !newData[0].text && builder.pushDeleted();

  for (let i = 0; i < newData.length; i++) {
    const currentLine = newData[i];

    if (!currentLine.text) {
      builder.pushInserted(currentLine);
      continue;
    }

    i === 0 && builder.pushDeleted();

    builder.pushTheSame(currentLine);

    builder.pushDeleted({ from: currentLine.row + 1 });
  }

  return result;
};

module.exports = diff;
