var express = require('express');
var router = new express.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    name: 'xpto'
  });
});

router.post('/', function (req, res) {
  res.status(201).json(req.body);
});

module.exports = router;
