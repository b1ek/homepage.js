
// do startup jobs
require('./startup');

const express = require('express');
const app = express();

const { APP_PORT } = process.env;

app.use(require('./routes'));

const server = app.listen(APP_PORT, () => {
		console.log("Listening on port " + APP_PORT);
});
