const express2 = require('express');
const router2 = express2.Router();
const authController = require('../controllers/authController.ts')

router2.post('/', authController.handleLogin)

module.exports = router2;
