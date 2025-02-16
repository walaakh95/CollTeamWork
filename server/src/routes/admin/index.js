const { Router } = require("express");
const csrf = require('csurf');
const adminRouter = Router()
const adminMiddleware = require("../../middlewares/adminMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
const userRouter = require("./userRoutes");
const roleRouter = require("./roleRoutes");
const csrfProtection = csrf({ cookie: true });

adminRouter.use(authMiddleware)
adminRouter.use(adminMiddleware)

adminRouter.use("/user", csrfProtection, userRouter)
adminRouter.use("/role", csrfProtection, roleRouter)

module.exports = adminRouter