const Role = require("../models/roleModel");

class RoleRepository {
  async createRole(roleData) {
    return await Role.create(roleData);
  }

  async getAllRoles() {
    return await Role.find();
  }

  async getRoleById(id) {
    return await Role.findById(id).select("-_id");
  }

  async updateRole(id, roleData) {
    return await Role.findByIdAndUpdate(id, roleData, { new: true });
  }

  async deleteRole(id) {
    return await Role.findByIdAndDelete(id);
  }
}

module.exports = new RoleRepository();
