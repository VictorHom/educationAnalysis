'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
module.exports = router;

// all i might need is the get
router.get('/', function(req, res, next) {
  mongoose.model('StudentData').find({}).limit(400)
    .then(function(students) {
      res.send(students);
    })
})
