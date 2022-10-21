/**
 * Project : saveOrder
 * Description :Order Services.
 * CreateBy : Nizam
 * Date : 21-10-2022
 */
const jsonfile = require('jsonfile')
const path = require('path');
const _ = require('lodash');
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
        let orderRequest   ={
            order_id  :_.random(0, 1000),
            user_id   :req.body.user_id,
            product_id:req.body.product_id,
            quantity  :req.body.quantity
        }
        if(!_.isEmpty(orderJson)) { 
        
        var finalRequestOrder =[orderRequest, ...orderJson]
        }else{
        var finalRequestOrder =[orderRequest]
        }
        let orderSave    = await  jsonfile.writeFileSync(orderModel, finalRequestOrder, { spaces: 2, EOL: '\r\n' })
        if(finalRequestOrder){
            return req.body;
        }
        } catch (error) {
        return next(error) 
      }
    
      }
}

module.exports =orderService;