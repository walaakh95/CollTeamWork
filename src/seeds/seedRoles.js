// src/seeds/seedRoles.js

const Role = require('../models/roleModel');

/**
 * Seeds default roles in the DB if they don't already exist.
 */
async function seedRoles() {
  const defaultRoles = ['admin', 'user', 'moderator'];

  for (const roleName of defaultRoles) {
    // Check if this role already exists
    const existingRole = await Role.findOne({ name: roleName });
    if (!existingRole) {
      await Role.create({ name: roleName });
      console.log(`Seeded role: ${roleName}`);
    }
  }
}

module.exports = seedRoles;