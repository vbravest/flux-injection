const BaseConfig = require('./env.js');

/**
 * Constants to use when development is target build environment. 
 * These override the default values found in env.js.
 *
 * @usage $ gulp --dev
 * 
 * @class Config
 * @static
 */
const Config = {
    MINIFY: false,
    NOTIFY: true,
    SERVER_PORT: 3000,
    SERVER_OPEN: true,
};

module.exports = Object.assign({}, BaseConfig, Config);
