'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
module.exports = router;

// all i might need is the get
router.get('/', function(req, res, next) {
  let students = [];
  for (let i = 420; i < 435; i++) {
    students = students.concat(require('./../../../db/data/cleanDataArray' + i +'.js'))
  };
  console.log(students.length);
  //.limit(400)
  // worry about consecutive gets
  // a get for all of them causes an error :(
  // mongoose.model('StudentData').find({}).limit(1000)
  //   .then(function(students) {
  //     res.send(students);
  //   })
  res.send(students);

})
