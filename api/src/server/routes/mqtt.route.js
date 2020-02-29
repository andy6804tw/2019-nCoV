import express from 'express';
import mqttCtrl from '../controllers/mqtt.controller';

const router = express.Router();


router.route('/')
  .post(mqttCtrl.dataPost) /** 新增sensor data */
  .get(mqttCtrl.dataGet); /** 取得 data 所有值組 */

router.route('/test')
  .get(mqttCtrl.dataTest);

export default router;
