const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'tslib') {
    return context.resolveRequest(context, path.resolve(__dirname, 'node_modules/tslib/tslib.es6.js'), platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};
module.exports = config;