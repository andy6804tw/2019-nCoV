'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const request = require('request');
const cheerio = require('cheerio');

const test = (req, res) => {
  res.send('測試');
};

const dataGet = (req, res) => {
  request({
    url: 'https://news.campaign.yahoo.com.tw/2019-nCoV/index.php', // 中央氣象局網頁
    method: 'GET'
  }, (error, response, body) => {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
    const confirmResult = []; // 建立一個儲存結果的容器
    const deathResult = []; // 建立一個儲存結果的容器
    const cheerioDataTitle = $('.dataTitle'); // 爬最外層的 Table(class=BoxTable) 中的 tr
    const cheerioCurrent = $('.current');
    const cheerioMoreThan = $('.moreThan');
    // const china_conform=table_tr.find('.box _china');
    for (let i = 0; i < 3; i += 1) {
      const title = cheerioDataTitle.eq(i).text().trim();
      const currentCount = cheerioCurrent.eq(i).text().trim();
      const morethan = cheerioMoreThan.eq(i).text().trim();
      const confirm = Object.assign({ title, currentCount, morethan });
      confirmResult.push(confirm);
    }
    for (let i = 3; i < 6; i += 1) {
      const title = cheerioDataTitle.eq(i).text().trim();
      const currentCount = cheerioCurrent.eq(i).text().trim();
      const morethan = cheerioMoreThan.eq(i).text().trim();
      const death = Object.assign({ title, currentCount, morethan });
      deathResult.push(death);
    }
    const result = Object.assign({ confirm: confirmResult, death: deathResult });
    // console.log(confirmResult);
    // console.log(deathResult);
    console.log(result);
    res.send(result);
  });
};

exports.default = {
  test,
  dataGet
};


request({
  url: 'https://news.campaign.yahoo.com.tw/2019-nCoV/index.php', // 中央氣象局網頁
  method: 'GET'
}, (error, response, body) => {
  if (error || !body) {
    return;
  }
  const $ = cheerio.load(body); // 載入 body
  const confirmResult = []; // 建立一個儲存結果的容器
  const deathResult = []; // 建立一個儲存結果的容器
  const cheerioDataTitle = $('.dataTitle'); // 爬最外層的 Table(class=BoxTable) 中的 tr
  const cheerioCurrent = $('.current');
  const cheerioMoreThan = $('.moreThan');
  // const china_conform=table_tr.find('.box _china');
  for (let i = 0; i < 3; i += 1) {
    const title = cheerioDataTitle.eq(i).text().trim();
    const current = cheerioCurrent.eq(i).text().trim();
    const morethan = cheerioMoreThan.eq(i).text().trim();
    const confirm = Object.assign({ title, current, morethan });
    confirmResult.push(confirm);
  }
  for (let i = 3; i < 6; i += 1) {
    const title = cheerioDataTitle.eq(i).text().trim();
    const current = cheerioCurrent.eq(i).text().trim();
    const morethan = cheerioMoreThan.eq(i).text().trim();
    const death = Object.assign({ title, current, morethan });
    deathResult.push(death);
  }
  const result = Object.assign({ confirm: confirmResult, death: deathResult });
  // console.log(confirmResult);
  // console.log(deathResult);
  console.log(result);
});