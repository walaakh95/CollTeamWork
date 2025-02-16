const { Router } = require("express");
const authRouter = require("./authRoutes");
const adminRouter = require("./admin");
const appRouter = Router()

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/admin", adminRouter )

module.exports = appRouter