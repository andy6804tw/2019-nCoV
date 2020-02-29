'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/article
  createArticle: {
    body: {
      user_id: _joi2.default.number().required(), // 數字＋必填
      article_title: _joi2.default.string().required(), // 字串＋必填
      article_tag: _joi2.default.string().required(), // 字串＋必填
      article_content: _joi2.default.string().min(20).required() // 文章長度至少20字
    }
  },
  // POST /api/user
  createUser: {
    body: {
      user_name: _joi2.default.string().required(), // 字串＋必填
      user_mail: _joi2.default.string().email().trim().required(), // 限定email格式並移除多餘空白
      user_password: _joi2.default.string().regex(/[a-zA-Z0-9]{6,30}$/).required() // 最小長度6最大30，只允許英文大小寫和數字
    }
  }
};