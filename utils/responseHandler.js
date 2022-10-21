const httpResponse = require('../utils/httpResponseCode');
module.exports = {

    successResponse: (data, message) => {
        return {
            statusCode: httpResponse.OK,
            message: message ?  message : 'Success',
            data: data
        };
    },
    customeResponse: (statusCode, message) => {
        return {
            statusCode: statusCode,
            message: message ?  message : 'Success',
        };
    },
    successResponsehistory: (data, message,type) => {
        return {
            statusCode: httpResponse.OK,
            message: message ?  message : 'Success',
            data: data,
            history:(type=='contract')?0:1
        };
    },

    errorAsBadRequest: (res, error) => {
        res.status(httpResponse.BAD_REQUEST)
            .send(module.exports.createResponseObject(httpResponse.BAD_REQUEST,'Error',[],error));
    }  
    ,
    errorResponse: (error, message) => {
        return {
            statusCode: httpResponse.INTERNAL_SERVER_ERROR,
            message: message ?  message : 'Internal server error',
            error: error,
            
        };
    },
    UnauthorizedResponse: (error, message) => {
        return {
            statusCode: httpResponse.UNAUTHORIZED,
            message: message ?  message : 'User crdentioals are mismatch, Unauthorized user.',
            error: error,
            
        };
    },
    createResponseObject :(statusCode, message,data,error) =>{
        return {
            statusCode: statusCode ?  statusCode :  httpResponse.OK,
            message: message ?  message : 'Success',
            data: data,
            error:error
        };
    },
    createCustomeResponseObject :(statusCode, error) =>{
        return {
            statusCode: statusCode ?  statusCode :  httpResponse.OK,
            message: error ?  error : 'Success',
            
        };
    }
} 

