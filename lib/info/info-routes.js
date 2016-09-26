var express = require('express');
var controller = require('./controller');
var router = new express.Router();

router.get('/api/info', controller.getInfo);

module.exports = router;
