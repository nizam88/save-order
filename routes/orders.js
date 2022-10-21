/**
 * Project : saveOrder
 * Description :Orders routes.
 * CreateBy : Nizam
 * Date : 21-10-2022
 */
const express = require('express');
const router  = express.Router();
const orderValidation = require('../validations/orderValidation');
const orderController = require('../controllers/orderController')

router.post('/save-order',orderValidation.saveOrder,orderController.saveOrder)
module.exports = router;
