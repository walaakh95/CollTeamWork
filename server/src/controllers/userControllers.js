const userService = require("../services/userService");

class UserController {
  async createUser(req, res) {
    try {
      const userId = await userService.createUser(req.body);
      res.status(201).json({ message: "User created successfully", userId });
    } catch (err) {
      res.status(err.statusCode).json({ error: err.message });
    }
  }
  
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }


  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id, true);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
