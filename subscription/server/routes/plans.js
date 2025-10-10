
import express from 'express';
import * as planCtrl from '../controllers/planController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', planCtrl.getPlans);
router.get('/:id', planCtrl.getPlan);

// admin
router.post('/', protect, admin, planCtrl.createPlan);
router.put('/:id', protect, admin, planCtrl.updatePlan);
router.delete('/:id', protect, admin, planCtrl.deletePlan);

export default router;
