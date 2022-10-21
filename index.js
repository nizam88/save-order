/**
 * Description : This is our main exection file.
 * CreateBy : Nizam
 * Date : 21-10-2022
 */
 require('dotenv').config();
 const express         = require('express');
 const bodyParsor      = require('body-parser');
 const cors            = require('cors');
 const app             = express();

 const PORT = process.env.PORT || 8080;

app.use(bodyParsor.urlencoded({extended: false
}));
app.use(bodyParsor.json());
app.use(cors());

// * Application-Level Middleware * //
app.use((error, req, res, next) => {
	logger.info(`${error.status || 500} - ${error.message} - ${error.originalUrl} - ${req.method} - ${req.ip}`);
	res.status(error.status || 500);
	res.send({
		error: error.status,
		message: error.message,
	});
});


app.get('/', (req, res) => {
 res.send('Hello World!')
})


let orderRouter = require('./routes/orders');
app.use('/api/orders', orderRouter);

app.all('*', function (req, res) {
	const error = new Error('Route Not Found');
	error.status = 404;
	res.status(error.status || 500);
	res.send({
		error: error.status,
		message: error.message,
	});
});

app.listen(PORT, () => {
    console.log(`Server is listen at ${PORT}`);
});