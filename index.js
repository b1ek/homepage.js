
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
const cookie_parse = require('cookie-parser');
const cookie_encrypt = require('cookie-encrypter');
const Redis = require("ioredis");
const bodyparser = require('body-parser');

let redisClient = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
let RedisStore = require("connect-redis")(session)

const { APP_PORT, APP_KEY } = process.env;


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookie_parse(APP_KEY))
app.use(cookie_encrypt(APP_KEY));
app.use(session({
	secret: APP_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true },
	store: new RedisStore({ client: redisClient })
}));
app.use(require('./middleware'));

app.use(require('./routes'));
app.use(express.static('public'));

// 404
app.use((req, res, next) => {

})



// error handler
app.use(async (err, req, res, next) => {
	console.log(err);
    if (res.headersSent) {
        return next(err);
    }

	const Helpers = require('./helpers');

    res.status(500);
	res.send(await Helpers.ViewLoader.load('error.pug', {
        error: '500 Internal Server Error',
        message: 'An unexpected error happened in the server'
    }));
})

const server = app.listen(APP_PORT, () => {
		console.log("Listening on port " + APP_PORT);
});
