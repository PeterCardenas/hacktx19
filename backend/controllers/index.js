const express = require('express');
const messageRouter = require('./message');
const userRouter = require('./user');
const router = express.Router();

router.use('/message', messageRouter);
router.use('/user', userRouter);

module.exports = router;