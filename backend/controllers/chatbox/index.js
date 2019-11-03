const express = require('express');
const chatbox = require('./chatbox');
const router = express.Router();

router.get('/get', chatbox.getRooms);
router.post('/create', chatbox.createRoom);

module.exports = router;