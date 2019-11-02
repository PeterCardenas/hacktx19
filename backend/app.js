let express = require('express');
global.CONFIG = require("./config/config");

const mongoDb = require("./util/db");
const logger = require('./util/logger');

mongoDb.connect();

let app = express();

const router = require('./controllers');
app.use('/', router);

app.listen(CONFIG.PORT, () => {
    logger.info(`Backend listening on port ${CONFIG.PORT}`);
})