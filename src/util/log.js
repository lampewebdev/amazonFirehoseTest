const colors = require('colors');

export default ({ event, data }) => {
  let color = 'white';
  if (event === 'error') {
    color = 'red';
  }
  if (event === 'success') {
    color = 'green';
  }
  process.stdout.write(colors[color](
    `[${event}] ${JSON.stringify(data)}\n`,
  ));
  return true;
};
