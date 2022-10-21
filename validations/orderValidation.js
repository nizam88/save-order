/**
 * 
 */
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const messages = require('../config/messages');
const Helper = require('../helpers/validationHelper');
const ErrorHandler = require('../utils/responseHandler');

 module.exports = {
    
 saveOrder: [
    check('user_id')
    .trim()
    .notEmpty()
    .withMessage('User id is required.')
    .isInt()
    .withMessage('User id should be integer.'),
    
    check('product_id')
         .trim()
         .notEmpty()
         .withMessage('Product id is required.')
         .isInt()
         .withMessage('Product id should be integer.')
         .custom(async (value, { req }) => {
             var productId = req.body.product_id;
             const checkProduct = await Helper.isProductExits(productId);
             if (!_.isBoolean(checkProduct)) {
                 throw new Error(messages.PRODUCT_NOT_EXITS);
             }
         }),
     check('quantity')
         .trim()
         .notEmpty()
         .withMessage('Quantity is required.')
         .isInt()
		 .isLength({ min: 1 })
         .withMessage('Quantity minimum should be 1.')
         .custom(async (value, { req }) => {
            var productId = req.body.product_id;
            var quantity = req.body.quantity;
            const checkInventory = await Helper.checkProductInventory(productId,quantity);
            if (_.isEmpty(checkInventory)) {
                throw new Error(messages.INVENTORY_NOT_EXITS);
            }
        })
        .custom(async (value, { req }) => {
            var productId = req.body.product_id;
            var userId = req.body.user_id;
            const checkDuplicateOrder = await Helper.checkDuplicateOrder(userId,productId);
            if (!_.isEmpty(checkDuplicateOrder)) {
                throw new Error(messages.DUPLICATE_ORDER_EXITS);
            }
        }),
       (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.send(ErrorHandler.errorAsBadRequest(res, JSON.stringify(errors)));
        next();
    },
 ]
 }