var express = require('express');
var controller = require('./controller');
var router = new express.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    name: 'xpto'
  });
});

router.post('/', controller.postImage);

module.exports = router;
