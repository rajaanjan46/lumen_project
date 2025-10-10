import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  status: { type: String, enum: ['active','cancelled','expired'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  autoRenew: { type: Boolean, default: true },
  usageGB: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Subscription', SubscriptionSchema);
