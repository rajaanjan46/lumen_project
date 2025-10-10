require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Plan = require('../models/Plan');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await Plan.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('admin123', salt);
  const userPass = await bcrypt.hash('user123', salt);

  await User.create([
    { name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' },
    { name: 'Demo User', email: 'user@example.com', password: userPass, role: 'user' }
  ]);

  await Plan.create([
    { title: 'Basic 100GB', price: 199, quotaGB: 100, features: ['100 Mbps', 'No free router'] },
    { title: 'Plus 300GB', price: 399, quotaGB: 300, features: ['300 Mbps', 'Free router'] },
    { title: 'Unlimited', price: 699, quotaGB: 0, features: ['Unlimited data', 'Priority support'] }
  ]);

  console.log('Seeded DB');
  process.exit();
};

seed().catch(console.error);
