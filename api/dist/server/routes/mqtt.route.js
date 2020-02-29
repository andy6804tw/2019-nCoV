'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mqtt = require('../controllers/mqtt.controller');

var _mqtt2 = _interopRequireDefault(_mqtt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.route('/').post(_mqtt2.default.dataPost) /** 新增sensor data */
.get(_mqtt2.default.dataGet); /** 取得 data 所有值組 */

router.route('/test').get(_mqtt2.default.dataTest);

exports.default = router;