'use strict';

// built-in modules
const pathLib = require('path');
// installed modules
const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');
// custom modules
const connectToDb = require('../server/db');
Promise.promisifyAll(fs);


const clearDb = function () {
  return Promise.map(['StudentData'], function (modelName) {
    return mongoose.model(modelName).remove();
  });
};

connectToDb.bind({ docsToSave: {} })
.then(function () {
  return Promise.join(clearDb());
})
.then(() => {
  return fs.readdirAsync(path.join(__dirname,'./data'));
})
.then((filesnames) => {
  let PromisedFiles = filesnames.map((file) => {
    return fs.readFileAsync(path.join(__dirname+"/data/",file));
  });
  return Promise.all(PromisedFiles);
})
.then((studentDatas) => {
  console.log("here is the end of storing data");
  return studentDatas.map( (studentData,index) => {
    let arr = studentData.toString().slice("module.exports=".length);
    let arrData =  JSON.parse(arr);
    return mongoose.model("StudentData").collection.insert(arrData);
  });
})
.then(function () {
  console.log(chalk.green('complete!'));
  process.exit(0);
})
.catch(function (err) {
  console.error(chalk.red(err));
  console.error(err.stack);
  process.exit(1);
});
