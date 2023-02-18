
// do startup jobs
require('./startup');

const express = require('express');
const app = express();
const session = require('express-session');
const cookie_parse = require('cookie-parser');
const cookie_encrypt = require('cookie-encrypter');

const { APP_PORT, APP_KEY } = process.env;

app.use(require('./routes'));
app.use(express.static('public'));

app.use(cookie_parse(APP_KEY))
app.use(cookie_encrypt(APP_KEY));
app.use(session({
	secret: APP_KEY,
	cookie: { secure: true }
}));

const server = app.listen(APP_PORT, () => {
		console.log("Listening on port " + APP_PORT);
});
