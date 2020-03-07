import express from 'express';
import virusCtrl from '../controllers/virus.controller';

const router = express.Router();


router.route('/test')
  .get(virusCtrl.test);

router.route('/')
  .get(virusCtrl.dataGet);

router.route('/countryEpidLevel')
  .get(virusCtrl.countryEpidLevelGet);

router.route('/news/zh')
  .get(virusCtrl.newsGet);

export default router;
