var express = require('express');
var controller = require('./controller');
var router = new express.Router();

router.get('/', controller.getInfo);

module.exports = router;
