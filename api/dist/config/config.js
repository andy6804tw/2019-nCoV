'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const envVarSchema = _joi2.default.object().keys({
  NODE_ENV: _joi2.default.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: _joi2.default.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: _joi2.default.number().default(3306), // 數字且預設值為3306
  MYSQL_HOST: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('140.133.13.49'),
    otherwise: _joi2.default.string().default('127.0.0.1')
    // otherwise: Joi.string().default('35.192.88.148')
  }),
  MYSQL_USER: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('debian-sys-maint'),
    otherwise: _joi2.default.string().default('root')
    // otherwise: Joi.string().default('q54888617')
  }),
  MYSQL_PASS: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('euVdNH575rriP4Gu'),
    otherwise: _joi2.default.string().default('wjxeqbSeB7.1')
    // otherwise: Joi.string().default('q54888617')
  }),
  MYSQL_DATABASE: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('MQTT_api'),
    otherwise: _joi2.default.string().default('MQTT_api')
    // otherwise: Joi.string().default('quapni_api')
  }),
  ECPAY_HASHKEY: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('ww4icIu3RuqDAc74'),
    otherwise: _joi2.default.string().default('5294y06JbISpM5x9')
  }),
  ECPAY_MERCHANT_ID: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('3043395'),
    otherwise: _joi2.default.string().default('2000132')
  }),
  ECPAY_HASH_IV: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('GDiTbnPGuFtsuhqQ'),
    otherwise: _joi2.default.string().default('v77hoKGq4kWxNNIS')
  }),
  ECPay_TRADE_QUERY: _joi2.default.string().when('NODE_ENV', {
    is: _joi2.default.string().equal('production'),
    then: _joi2.default.string().default('https://payment.ecpay.com.tw/Cashier/QueryTradeInfo/V5'),
    otherwise: _joi2.default.string().default('https://payment-stage.ecpay.com.tw/Cashier/QueryTradeInfo/V5')
  }),
  EMAIL: _joi2.default.string().default('quapni@gmail.com'),
  CLIENT_ID: _joi2.default.string(),
  CLIENT_SERECT: _joi2.default.string(),
  REFLESH_TOKEN: _joi2.default.string(),
  VERSION: _joi2.default.string().default('1.0.0') // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = _joi2.default.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.MYSQL_DATABASE, // 資料庫名稱(MYSQL_DATABASE)
  emailSender: envVars.EMAIL, // 寄件者
  emailClientID: envVars.CLIENT_ID, // Emain OAuth3 Login
  emailClientSerect: envVars.CLIENT_SERECT, // Emain OAuth3 Login
  emailRefleshToken: envVars.REFLESH_TOKEN, // Emain OAuth3 Login
  ECPayHashKey: envVars.ECPAY_HASHKEY, // 綠界金流
  ECPayMerchantID: envVars.ECPAY_MERCHANT_ID, // 綠界金流
  ECPayHashIV: envVars.ECPAY_HASH_IV, // 綠界金流
  ECPayTradeQuery: envVars.ECPay_TRADE_QUERY // 綠界訂單查詢API網址
};

exports.default = config; // 匯出共用