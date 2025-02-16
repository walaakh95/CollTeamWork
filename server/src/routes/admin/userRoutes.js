const { Router } = require("express");
const userController = require("../../controllers/userControllers");
const userRouter = Router();

userRouter.get("", userController.getAllUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("", userController.createUser)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter;