const BaseConfig = require('./env.js');

/**
 * Constants to use when production is target build environment. 
 * These override the default values found in env.js.
 *
 * @usage $ gulp --prod
 *
 * @class Config
 * @static
 */
const Config = {
    MINIFY: true,
    NOTIFY: false,
};

module.exports = Object.assign({}, BaseConfig, Config);
