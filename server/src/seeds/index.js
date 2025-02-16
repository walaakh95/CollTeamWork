// src/seeds/index.js

const connectDB = require('../config/db');
const seedRoles = require('./seedRoles');
const seedUsers = require('./seedUsers'); // if you have it

(async () => {
  try {
    await connectDB();

    await seedRoles();

    await seedUsers();

    console.log('All seeding operations completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();