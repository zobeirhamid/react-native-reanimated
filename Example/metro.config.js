const blacklist = require('metro-config/src/defaults/blacklist');
const path = require('path');

const glob = require('glob-to-regexp');

function getBlacklist() {
  const nodeModuleDirs = [
    glob(`${path.resolve(__dirname, '..')}/node_modules/*`),
    glob(`${path.resolve(__dirname)}/node_modules/*`),
    glob(`${path.resolve(__dirname, '..')}/android/*`),
    glob(`${path.resolve(__dirname)}/android/*`),
    glob(`${path.resolve(__dirname, '..')}/docs/*`),
    glob(`${path.resolve(__dirname, '..')}/e2e/*`),
    glob(`${path.resolve(__dirname)}/node_modules/*/node_modules/fbjs/*`),
    glob(
      `${path.resolve(
        __dirname
      )}/node_modules/*/node_modules/hoist-non-react-statics/*`
    ),
    glob(
      `${path.resolve(
        __dirname
      )}/node_modules/react-native/node_modules/@babel/*`
    ),
  ];
  return blacklist(nodeModuleDirs);
}

module.exports = {
  resolver: {
    blacklistRE: getBlacklist(),
    extraNodeModules: {
      lodash: path.resolve(__dirname, 'node_modules/lodash'),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    }
  },
  watchFolders: [path.resolve(__dirname, '..')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};