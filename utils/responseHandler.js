const httpResponse = require('../utils/httpResponseCode');
module.exports = {

    successResponse: (data, message) => {
        return {
            statusCode: httpResponse.OK,
            message: message ?  message : 'Success',
            //data: data
        };
    },
    customeResponse: (statusCode, message) => {
        return {
            statusCode:  httpResponse.ALREADY_EXIST,
            message: message ?  message : 'Success',
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
    createResponseObject :(statusCode, message,data,error) =>{
        return {
            statusCode: statusCode ?  statusCode :  httpResponse.OK,
            message: message ?  message : 'Success',
            data: data,
            error:error
        };
    },
    UnauthorizedResponse: (error, message) => {
        return {
            statusCode: httpResponse.UNAUTHORIZED,
            message: message ?  message : 'User crdentioals are mismatch, Unauthorized user.',
            error: error,
            
        };
    }
    
    
} 

