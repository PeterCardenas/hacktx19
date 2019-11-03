const express = require('express');
const messageRouter = require('./message');
const userRouter = require('./user');
const chatboxRouter = require('./chatbox');
const router = express.Router();

router.use('/message', messageRouter);
router.use('/user', userRouter);
router.use('/chatbox', chatboxRouter);

module.exports = router;