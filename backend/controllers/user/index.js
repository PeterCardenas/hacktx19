const express = require("express");
const router = express.Router();
const login = require('./login');

router.post('/login', login.login);
router.post('/register', login.registration);

module.exports = router;