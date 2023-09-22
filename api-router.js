const express = require("express");
const middleware = require("./api-middleware");
const controller = require("./api-controller");
const globalMiddleware = require('./middlewares/globalMiddlewares')




const router = express.Router();

router.use(globalMiddleware.apiKeyAuth)
// router.get("/",  controller.GetInventories);

router.get('/:id',middleware.checkId, controller.getSpecificInventory)

router.post("/", globalMiddleware.checkAdmin, middleware.checkInventory, controller.createInventory);

router.delete('/:id',globalMiddleware.checkAdmin, middleware.checkId, controller.delInventory)

router.put('/:id',globalMiddleware.checkAdmin, middleware.checkId, controller.updateInventory)


module.exports = router