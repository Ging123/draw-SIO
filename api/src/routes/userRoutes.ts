import express from 'express';

const route = express.Router();
const createUserRoute = require('../use_cases/user/create/controller');
const loginUserRoute = require('../use_cases/user/login/controller');
const logoutUserRoute = require('../use_cases/user/logout/controller');
const getUserRoute = require('../use_cases/user/get/controller');
const deleteUserRoute = require('../use_cases/user/delete/controller');

route.use(createUserRoute);
route.use(loginUserRoute);
route.use(logoutUserRoute);
route.use(getUserRoute);
route.use(deleteUserRoute);

module.exports = route;