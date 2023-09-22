const path = require('path');
const webpack = require('webpack');

const rootDistDir = path.resolve(__dirname, '../dist');

/**
 * 获取当前项目结构信息
 * @returns 
 */
function generateProjectInfo() {

  const cwd = process.cwd();
  const dirs = cwd.split(path.sep);
  const projectName = dirs[dirs.length - 1];

  return {
    /**
     * 获取当前项目名称
     * @returns 
     */
    getProjectName() {
      return projectName;
    },
    getProjectDir() {
      return cwd;
    },
    /**
     * 获取当前项目编译dist文件夹
     * @returns 
     */
    getDistDir() {
      return path.resolve(rootDistDir, projectName);
    },
  };
}

/**
 * 获取DLL库相关信息
 * @returns 
 */
function generateDLLInfo() {
  const dllLibrary = 'dll-library';
  const dllDir = path.resolve(rootDistDir, dllLibrary);
  return {
    /**
     * DLL项目编译dist文件夹
     * @returns 
     */
    getDLLDir() {
      return dllDir;
    },
    /**
     * DLL项目编译js文件夹
     * @returns 
     */
    getDLLJsDir() {
      return path.resolve(dllDir, 'js');
    },
    useDLLBuilderPlugin() {
      return new webpack.DllPlugin({
        // context: this.getDLLJsDir(),
        // context: dllDir,
        name: '[name]_[fullhash]',
        path: path.join(dllDir, 'manifest.json'),
      })
    },
    useDLLOutputPlugin() {
      return new webpack.DllReferencePlugin({
        // context: dllDir,
        // context: this.getDLLJsDir(),
        manifest: require(path.resolve(dllDir, './manifest.json')),
      });
    },
  };
}

module.exports = { generateProjectInfo, generateDLLInfo };