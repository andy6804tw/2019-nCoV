'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _AppError = require('../server/helper/AppError');

var _AppError2 = _interopRequireDefault(_AppError);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _index = require('../server/routes/index.route');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());
app.use((0, _cors2.default)({
  // origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));

// HTTP request logger middleware for node.js
if (_config2.default.env === 'development') {
  app.use((0, _morgan2.default)('dev'));
}

// prevent GET /favicon.ico
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// mount all routes on /api path
app.use('/', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorMessage;
  let errorTag;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof _expressValidation2.default.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorTag = 'REQUEST_ERROR';
      errorMessage = err.errors.map(error => {
        return error.messages.join('. ');
      }).join(' and ');
      errorCode = 400;
      errorStatus = _httpStatus2.default.BAD_REQUEST;
    }
    const error = new _AppError2.default.APIError(errorStatus, errorMessage, errorTag, errorCode);
    return next(error);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new _AppError2.default.APIError(_httpStatus2.default.NOT_FOUND, 'API not found', 'API_NOT_FOUND', 404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    code: err.code,
    tag: _config2.default.env === 'development' ? err.tag : '',
    // message: config.env === 'development' ? err.message : '',
    message: err.message,
    stack: _config2.default.env === 'development' ? err.stack : {}
  });
});

exports.default = app;