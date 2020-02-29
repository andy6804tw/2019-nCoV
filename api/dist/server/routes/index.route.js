'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mqtt = require('./mqtt.route');

var _mqtt2 = _interopRequireDefault(_mqtt);

var _virus = require('./virus.route');

var _virus2 = _interopRequireDefault(_virus);

var _config = require('./../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

/* GET localhost:[port]/api page. */

// Router
router.get('/', (req, res) => {
  res.send(`server started on PORT ${_config2.default.port} (${_config2.default.env})`);
});

/** User Router */
router.use('/virus', _virus2.default);
/** Student Router */
router.use('/mqtt', _mqtt2.default);

exports.default = router;