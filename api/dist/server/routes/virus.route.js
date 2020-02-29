'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _virus = require('../controllers/virus.controller');

var _virus2 = _interopRequireDefault(_virus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.route('/test').get(_virus2.default.test);

router.route('/').get(_virus2.default.dataGet);

exports.default = router;