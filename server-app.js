'use strict'

const ApiService = require("./app/api/api-service");
const dbController = require('./app/db/data-base-controller/data-base.controller');

//Init system variable environment
require('dotenv').config();

//Init Api express
const apiServer = new ApiService();

//Init db connection
dbController.int();