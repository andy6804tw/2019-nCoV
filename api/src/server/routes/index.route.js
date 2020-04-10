import express from 'express';
// Router
import virus from './virus.route';
import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`server started on PORT ${config.port} (${config.env})`);
});

/** virus Router */
router.use('/virus', virus);

export default router;
