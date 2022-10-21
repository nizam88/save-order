const path = require('path');
const _            = require('lodash');
const jsonfile     = require('jsonfile')
const productModel = path.join(__dirname, '../models/products.json');
const orderModel = path.join(__dirname, '../models/orders.json');


module.exports = {

     
    /**
     * Description : Check product is exits in product json file or not. 
     * @param {*} productId 
     * @returns 
     */
    isProductExits: async (productId) => {
	     let products = await jsonfile.readFileSync(productModel);
        if(products){
          let productFound  = products.find(products => parseInt(products.id) == parseInt(productId));
          if(_.isObject(productFound)){
            return true;
          } 
          else{
            return false;
          } 
        }
    },

    /**
     * Description : Check product inventory is exits in product json or not.
     * @param {*} productId 
     * @param {*} quantity 
     * @returns 
     */
    
    checkProductInventory : async (productId,quantity)=>{
      let products = await jsonfile.readFileSync(productModel);
        if(products){
          
          var productFound = products.filter((result) => {
            return (parseInt(result.id) == parseInt(productId) && parseInt(result.stock) >= parseInt(quantity));
          });
          return productFound;
        }

    },

    /**
     * Description : Check duplicate order
     * @param {*} productId 
     * @param {*} quantity 
     * @returns 
     */
    checkDuplicateOrder: async (userId,productId)=>{
      let orderCheck = await jsonfile.readFileSync(orderModel);
        if(orderCheck){
          var orderFound = orderCheck.filter((result) => {
            return (parseInt(result.user_id) == parseInt(userId) && parseInt(result.product_id) == parseInt(productId));
          });
          return orderFound;
        }

    },


}