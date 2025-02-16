const User = require("../models/userModel");

class UserRepository {
  async createUser(userData) {
    return User.create(userData);
  }

  async getAllUsers() {
    return await User.find()
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).populate("roleId", "name");
  }

  async getUserById(id, roleAsName = false) {
    return await User.findById(id).populate("roleId", "name").toJSON({roleAsName})
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
