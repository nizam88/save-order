/**
 * Project : saveOrder Controller
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
       // Incase of using database used Transaction begin commit and rocllback.
			var saveOrder = await orderService.saveOderService(req,res,next)
      console.log(saveOrder.type);
      switch (saveOrder.type) {
        case "duplicate":
          return res.send(ResponseHandler.customeResponse(saveOrder, messages.DUPLICATE_ORDER_SAVE));  
          break;
          case "new":
          return res.send(ResponseHandler.successResponse(saveOrder, messages.ORDER_SAVE)); 
          break; 
        default:
          break;
      }
			
			} catch (error) {
			next(error);
		}
	},

}

module.exports =  orderController ;