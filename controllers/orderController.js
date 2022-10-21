/**
 * Project : saveOrder
 * Description :Orders routes.
 * CreateBy : Nizam
 * Date : 21-10-2022
 */
const orderService      = require('../services/orderService');
const messages          = require('../config/messages');
const ResponseHandler   = require('../utils/responseHandler');
const _            = require('lodash');
let orderController ={
    
    /**
     * Description: Save order 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    saveOrder: async (req, res, next) => {
		try {
			var saveOrder = await orderService.saveOderService(req,res,next)
			if(!_.isEmpty(saveOrder))
			return res.send(ResponseHandler.successResponse(saveOrder, messages.ORDER_SAVE));
			} catch (error) {
			next(error);
		}
	},

}

module.exports =  orderController ;