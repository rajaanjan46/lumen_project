import Subscription from '../models/Subscription.js';
import Plan from '../models/Plan.js';

export const getMySubscriptions = async (req, res) => {
  const subs = await Subscription.find({ user: req.user._id }).populate('plan');
  res.json(subs);
};

export const subscribe = async (req, res) => {
  const { planId, autoRenew = true } = req.body;
  const plan = await Plan.findById(planId);
  if(!plan) return res.status(404).json({ msg: 'Plan not found' });

  // endDate = +1 month
  const startDate = new Date();
  const endDate = new Date(); endDate.setMonth(endDate.getMonth() + 1);

  const sub = await Subscription.create({
    user: req.user._id,
    plan: planId,
    startDate,
    endDate,
    autoRenew
  });
  res.json(sub);
};

export const changePlan = async (req, res) => {
  // upgrade/downgrade both handled here
  const { newPlanId } = req.body;
  const sub = await Subscription.findOne({ user: req.user._id, status: 'active' });
  if(!sub) return res.status(404).json({ msg: 'Active subscription not found' });
  const plan = await Plan.findById(newPlanId);
  if(!plan) return res.status(404).json({ msg: 'Plan not found' });

  sub.plan = newPlanId;
  await sub.save();
  res.json(sub);
};

export const cancel = async (req, res) => {
  const sub = await Subscription.findOne({ user: req.user._id, status: 'active' });
  if(!sub) return res.status(404).json({ msg: 'Active subscription not found' });
  sub.status = 'cancelled';
  await sub.save();
  res.json({ msg: 'Cancelled', sub });
};
