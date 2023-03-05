
// do startup jobs
require('./startup');
if (process.env.APP_DEBUG == 'true') {
	process.env.DEBUG = '*/*';
	process.env.NODE_ENV = 'development';
} else {
	process.env.NODE_ENV = 'production';
}

const express = require('express');
const app = express();
const session = require('express-session');
const bodyparser = require('body-parser');

const { APP_PORT } = process.env;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(require('./middleware'));

app.use(require('./routes'));
app.use(express.static('public'));

// 404
app.use(async (req, res, next) => {
	if (res.headersSent) return next();

	res.status(404);
	res.template('error.pug', {
		error: '404 Not Found',
		message: 'The requested page was not found.'
	});
})

// error handler
app.use(async (err, req, res, next) => {
	console.log(err);
    if (res.headersSent) {
        return next(err);
    }

    res.status(500);
	res.template('error.pug', {
        error: '500 Internal Server Error',
        message: 'An unexpected error happened in the server'
    });
})

const server = app.listen(APP_PORT, () => {
		console.log("Listening on port " + APP_PORT);
});
