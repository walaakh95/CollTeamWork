const { Router } = require("express");
const roleController = require("../../controllers/roleController");
const roleRouter = Router();

roleRouter.get("", roleController.getAllRoles)
roleRouter.get("/:id", roleController.getRoleById)
roleRouter.post("", roleController.createRole)
roleRouter.put("/:id", roleController.updateRole)
roleRouter.delete("/:id", roleController.deleteRole)


module.exports = roleRouter;