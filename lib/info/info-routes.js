var express = require('express');
var router = new express.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    name: 'xpto'
  });
});

module.exports = router;
