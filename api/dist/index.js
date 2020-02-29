'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!module.parent) {
  // listen on port config.port
  _express2.default.listen(process.env.PORT || _config2.default.port, () => {
    _winston2.default.info(`server started on ${_config2.default.port} PORT (${_config2.default.env})`);
  });
}

exports.default = _express2.default;