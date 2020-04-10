import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(status, message, tag, code) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.tag = tag;
    this.code = code;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an instance of APIError.
   * @param {number} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} message 錯誤訊息
   * @param {string} tag 英文錯誤代號
   * @param {number} code 錯誤代碼
   * @memberof APIError
   */
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    message,
    tag,
    code,
  ) {
    super(status, message, tag, code);
    this.name = 'APIError';
  }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
  /**
   * Creates an instance of MySQLError.
   * @param {numner} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} [message='Mysql 發生錯誤']
   * @param {string} [tag='SERVER_ERROR']
   * @param {number} [code=500]
   * @memberof MySQLError
   */
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    message = '網路連線不穩，請稍後再試',
    tag = 'SERVER_ERROR',
    code = 500,
  ) {
    super(status, message, tag, code);
    this.name = 'MySQLError';
  }
}

/**
 * 信箱尚未註冊 Error
 * @extends ExtendableError
 */
class LoginError1 extends ExtendableError {
  /**
   * Creates an instance of MySQLError.
   * @param {numner} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} [message='Mysql 發生錯誤']
   * @param {string} [tag='SERVER_ERROR']
   * @param {number} [code=500]
   * @memberof MySQLError
   */
  constructor(
    status = httpStatus.UNAUTHORIZED,
    message = '信箱尚未註冊！',
    tag = 'Account_ERROR',
    code = 401,
  ) {
    super(status, message, tag, code);
    this.name = 'LoginError';
  }
}

/**
 * 密碼錯誤 Error.
 * @extends ExtendableError
 */
class LoginError2 extends ExtendableError {
  /**
   * Creates an instance of MySQLError.
   * @param {numner} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} [message='Mysql 發生錯誤']
   * @param {string} [tag='SERVER_ERROR']
   * @param {number} [code=500]
   * @memberof MySQLError
   */
  constructor(
    status = httpStatus.UNAUTHORIZED,
    message = '您輸入的密碼有誤！',
    tag = 'Account_ERROR',
    code = 401,
  ) {
    super(status, message, tag, code);
    this.name = 'LoginError';
  }
}

/**
 * 下載失敗 Error.
 * @extends ExtendableError
 */
class DownloadError extends ExtendableError {
  /**
   * Creates an instance of MySQLError.
   * @param {numner} [status=httpStatus.INTERNAL_SERVER_ERROR]
   * @param {string} [message='Mysql 發生錯誤']
   * @param {string} [tag='SERVER_ERROR']
   * @param {number} [code=500]
   * @memberof MySQLError
   */
  constructor(
    status = httpStatus.NOT_FOUND,
    message = '您尚未有上傳檔案的紀錄！',
    tag = 'Download_ERROR',
    code = 404,
  ) {
    super(status, message, tag, code);
    this.name = 'DownloadError';
  }
}

export default {
  APIError,
  MySQLError,
  LoginError1,
  LoginError2,
  DownloadError
};
