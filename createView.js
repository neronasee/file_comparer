const createView = data => {
  let str = '';

  data.forEach((item, i) => {
    const { sign, data } = item;
    str += `${i + 1} ${sign} ${data}\n`;
  });

  return str;
};

module.exports = createView;
