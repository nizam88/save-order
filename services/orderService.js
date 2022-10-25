/**
 * Project : saveOrder
 * Description :Order Services.
 * CreateBy : Nizam
 * Date : 21-10-2022
 */
const jsonfile = require('jsonfile')
const path = require('path');
const _ = require('lodash');
const Helper = require('../helpers/validationHelper');
const orderModel = path.join(__dirname, '../models/orders.json');

let orderService ={
    
    /**
     * Description : Save order service
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    saveOderService : async(req,res,next)=>{
        try {
        let orderJson      = await jsonfile.readFileSync(orderModel);
        const userId       = req.body.user_id;
        const productId    = req.body.product_id;
        const quantity     = req.body.quantity;
        let orderRequest   ={
            order_id  :_.random(0, 1000),
            user_id   :userId,
            product_id:productId,
            quantity  :quantity
        }
        if(!_.isEmpty(orderJson)) { 
        var finalRequestOrder =[orderRequest, ...orderJson]
        }else{
        var finalRequestOrder =[orderRequest]
        }
        await  jsonfile.writeFileSync(orderModel, finalRequestOrder, { spaces: 2, EOL: '\r\n' })
        const checkDuplicateOrder = await Helper.checkDuplicateOrder(userId,productId);
        var  orderSuccess ={
            "order":"Success"
           };
             if (_.size(checkDuplicateOrder)>1) {
                return {type:"duplicate",...orderSuccess};
             }else{
                return {type:"new",...orderSuccess};
             }

        } catch (error) {
        return next(error) 
      }
    
      }
}

module.exports =orderService;