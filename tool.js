const path = require('path');

function getProjectOutputDir() {
  const dirs = process.cwd().split(path.sep);
  const projectName = dirs[dirs.length - 1];
  return path.resolve(__dirname, 'dist', 'packages', `${projectName}`);
}

module.exports = { getProjectOutputDir };