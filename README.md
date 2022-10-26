# save-order
Save order items on the basis of inventory check and duplicate order check

## Requirements

[Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/en/starter/installing.html)

 rename `.env-sample` to `.env` in the file the DB connection string need to be updated according to your `credentials`.

### Run the app locally

- git clone https://github.com/nizam88/save-order.git

- `npm install`
- `nodemon index.js"` - This will start the application and run on port 3000

you can change port in `.env` file check `.env-sample`


## Folder Structure

```
└───config            # For Messages and constant
└───controllers       # Application route controllers for all the endpoints of the app
└───handlers          # Validation Helper logic
└───models            # Models (Refer here json file)
└───routes            # Application routes / endpoints
└───services          # Services used for business logic
└───Utils             # Response code handler
└───validations       # API Request request validations
└───index.js          # Application entry point
└───.env              # For Application Port

## Features

- If product inventory is available then save order in order.json file. otherwise given error : inventory not available. 
- If same (user & product) order already exits in order.json, then order success but message show you have place duplicate order.
- Mock product.json file used for product and their inventory.
- ordes.json file used for order saved.
- User take static
- Duplicate Order check on the basis of same user and same product already exits order in order.json file.
- REST API Request object validations - Basic

## REST Services

The application exposes a REST endpoints

 POST 'localhost:3000/api/orders/save-order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id":1,
    "product_id":1,
    "quantity":1
}'

## Success
{
    "statusCode": 200,
    "message": "Order save successfully."
}
## Duplicate order
{
    "statusCode": 409,
    "message": "You have placed duplicate order."
}

## Error

{
    "statusCode": 400,
    "message": "Error",
    "data": [],
    "error": "{\"errors\":[{\"value\":\"15\",\"msg\":\"Product Inventory not exits.\",\"param\":\"quantity\",\"location\":\"body\"}]}"
}


## Note-1
logging
security
middleware
database
Above these are not used: if you want i will make a complete application and share again.

## Note-2
If you wants to same codebase with typescript and express i will do the same and share to you.


