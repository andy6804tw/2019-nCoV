import express from 'express';
import virusCtrl from '../controllers/virus.controller';

const router = express.Router();


router.route('/test')
  .get(virusCtrl.test);

export default router;
