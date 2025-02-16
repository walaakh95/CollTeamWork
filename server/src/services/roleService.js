const roleRepository = require('../repositories/roleRepository');
const { validateRoleCreation } = require('../validators/roleValidator');

class RoleService {
  async createRole(roleData) {
    validateRoleCreation(roleData);
    const existingRole = await roleRepository.getRoleById(roleData);
    if (existingRole) 
      throw new JsonedResponseError("Role already exists", 409);
    const createdRole = await roleRepository.createRole(roleData);
    return createdRole._id;
  }

  async getAllRoles() {
    return roleRepository.getAllRoles();
  }

  async getRoleById(roleId) {
    return roleRepository.getRoleById(roleId);
  }

  async updateRole(roleId, updateData) {
    return roleRepository.updateRole(roleId, updateData);
  }

  async deleteRole(roleId) {
    return roleRepository.deleteRole(roleId);
  }
}

module.exports = new RoleService();
