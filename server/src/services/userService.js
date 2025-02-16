const JsonedResponseError = require("../errors/JsonedResponseError");
const userRepository = require("../repositories/userRepository");
const { validateUserCreation } = require("../validators/userValidtors");

class UserService {
  async createUser(userData) {
    validateUserCreation(userData);
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) 
      throw new JsonedResponseError("User already exists", 409);

    const createdUser = await userRepository.createUser(userData);
    return createdUser._id;
  }
  
  async getAllUsers(populateRoleId = false) {
    const users = await userRepository.getAllUsers(populateRoleId)
    return populateRoleId? users.map((user) => {
        user.role = user.roleId.name;
        delete user.roleId
        return user
    }):
    users;
  }
  
  async getUserById(userId, populateRoleId = false) {
    const user = await userRepository.getUserById(userId, populateRoleId)
    if (!user) 
      throw new JsonedResponseError("User doesn't exists", 409);
    if(populateRoleId){
      user.role = user.roleId.name;
      delete user.roleId
    }
    return user
  }

  async updateUser(userId, updateData) {
    return userRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId) {
    return userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
