import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quotaGB: { type: Number, default: 100 },
  features: { type: [String], default: [] },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Plan', PlanSchema);
