const { Router } = require("express");
const AuthController = require("../controllers/authController");
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/refresh-token", AuthController.refreshToken);
authRouter.post("/login", AuthController.login);

module.exports = authRouter;
