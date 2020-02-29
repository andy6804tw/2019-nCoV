import dataModule from '../modules/mqtt.module';


/**
 * Exam 資料表
 */

/*  Data GET 取得  */
const dataGet = (req, res) => {
  const macaddr = req.query.macaddr;
  const startTime = req.query.startTime;
  const endTime = req.query.endTime;
  dataModule.selectAllData(macaddr, startTime, endTime).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

/*  Data POST 新增  */
const dataPost = (req, res) => {
  const data = req.body.data_object.data;
  let vot = 0;
  let lat = 0;
  let lng = 0;
  if (data.length === 16) {
    vot = parseInt(data.substr(0, 4), 16);
  } else if (data.length === 22) {
    if (data.substr(2, 2) === '88') {
      const decLat = parseInt(data.substr(4, 6), 16).toString(); // 緯度
      const decLng = parseInt(data.substr(10, 6), 16).toString(); // 經度
      lat = `${decLat.substr(0, 2)}.${decLat.substr(2, decLat.length - 2)}`; // 緯度 22.9761
      lng = `${decLng.substr(0, 3)}.${decLng.substr(3, decLng.length - 3)}`; // 經度 120.216
      // console.log(parseInt(lat, 16) + ' ' + parseInt(lng, 16));
    }
  }
  // 新增內容
  const insertValues = {
    data_object: JSON.stringify(req.body.data_object),
    data_macaddr: req.body.data_object.macAddr.substr(8, 8),
    data_vot: vot,
    data_lat: lat,
    data_lng: lng
  };
  console.log(insertValues);
  dataModule.createData(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const dataTest = (req, res) => {
  const obj = {
    // channel: 922625000, sf: 12, time: '2019-05-29T00:56:31Z', gwip: '192.168.0.180', gwid: '00001c497b431ff5', repeater: '00000000ffffffff', systype: 170, rssi: -110.0, snr: 17.5, snr_max: 25.0, snr_min: 11.2, macAddr: '00000000aa205540', data: '0252ob50e8do3d70', frameCnt: 20, fport: 15
    channel: 922625000, sf: 12, time: '2019-05-29T00:56:31Z', gwip: '192.168.0.180', gwid: '00001c497b431ff5', repeater: '00000000ffffffff', systype: 170, rssi: -110.0, snr: 17.5, snr_max: 25.0, snr_min: 11.2, macAddr: '00000000aa205540', data: '018803818101D5980003e8', frameCnt: 20, fport: 15
  };
  const data = obj.data;
  let vot = 0;
  let lat=0;
  let lng=0;
  if (data.length === 16) {
    vot = parseInt(data.substr(0, 4), 16);
  } else if (data.length === 22) {
    if (data.substr(2, 2) === '88') {
      const decLat = parseInt(data.substr(4, 6), 16).toString(); // 緯度
      const decLng = parseInt(data.substr(10, 6), 16).toString(); // 經度
      lat = `${decLat.substr(0, 2)}.${decLat.substr(2, decLat.length-2)}`; // 緯度 22.9761
      lng = `${decLng.substr(0, 3)}.${decLng.substr(3, decLng.length-3)}`; // 經度 120.216
      // console.log(parseInt(lat, 16) + ' ' + parseInt(lng, 16));
    }
  }
  // 新增內容
  const insertValues = {
    data_object: JSON.stringify(obj),
    data_macaddr: obj.macAddr.substr(8, 8),
    data_vot: vot,
    data_lat: lat,
    data_lng: lng
  };
  console.log(insertValues);
  dataModule.createData(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const test = (req, res) => {
  res.send('測試');
};

export default {
  test,
  dataGet,
  dataPost,
  dataTest
};
