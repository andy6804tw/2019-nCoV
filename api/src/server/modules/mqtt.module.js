import mysql from 'mysql';
import async from 'async';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});


/*  Exam GET 取得  */
const selectAllData = (macaddr, startTime, endTime) => {
  let queryString;
  if (typeof (macaddr) !== 'undefined') {
    if (typeof (startTime) !== 'undefined' && typeof (endTime) !== 'undefined') {
      queryString = `SELECT * FROM Data WHERE data_macaddr= '${macaddr}' AND data_created_time > '${startTime}' AND data_created_time < '${endTime}'`;
    } else {
      queryString = `SELECT * FROM Data WHERE data_macaddr= '${macaddr}'`;
    }
  } else {
    queryString = 'SELECT * FROM Data';
  }
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // 取得科目名稱
          queryString
          , (error, result) => {
            if (error) {
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              const resResult = [];
              for (let i = 0; i < result.length; i += 1) {
                resResult.push({
                  id: result[i].data_id, macaddr: result[i].data_macaddr, data: result[i].data_vot, lat: result[i].data_lat, lng: result[i].data_lng, created_at: result[i].data_created_time
                });
              }
              resolve(Object.assign(resResult)); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};

/* Exam POST 新增 */
const createData = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Data SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
          if (error) {
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ user_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};

/* Exam PUT 修改 */
const modifyExam = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Studen資料表修改指定id一筆資料
        connection.query('UPDATE Exam SET ? WHERE student_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.message.match('Changed: 1')) { // 寫入成功
            resolve('資料修改成功');
          } else {
            resolve('資料無異動');
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  selectAllData,
  createData
};

