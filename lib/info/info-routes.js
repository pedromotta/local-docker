var express = require('express');
var controller = require('./controller');
var router = new express.Router();

router.get('/api/info', controller.getInfo);

router.get('/info', controller.render);

module.exports = router;
