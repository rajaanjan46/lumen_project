
import express from 'express';
import * as subCtrl from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/me', protect, subCtrl.getMySubscriptions);
router.post('/subscribe', protect, subCtrl.subscribe);
router.post('/change', protect, subCtrl.changePlan);
router.post('/cancel', protect, subCtrl.cancel);

export default router;
