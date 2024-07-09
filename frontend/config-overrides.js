// config-overrides.js
const paths = require('react-scripts/config/paths');

module.exports = function override(config, env) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    fs: false,
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    net: false,
    assert: require.resolve('assert/'),
    vm: require.resolve('vm-browserify'),
  });

  config.resolve.fallback = fallback;
  return config;
};
