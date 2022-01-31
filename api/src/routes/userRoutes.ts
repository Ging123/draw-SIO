import express from 'express';

const route = express.Router();
const createUserRoute = require('../use_cases/user/create/controller');
const loginUserRoute = require('../use_cases/user/login/controller');
const logoutUserRoute = require('../use_cases/user/logout/controller');
const getUserRoute = require('../use_cases/user/get/controller');
const deleteUserRoute = require('../use_cases/user/delete/controller');
const createNewUserTokenRoute = require('../use_cases/user/create_new_token/controller');
const confirmUserEmailRoute = require('../use_cases/user/confirm/controller');
const updateUserConfirmationCode = require('../use_cases/user/update_confirmation_token/controller');

route.use(createUserRoute);
route.use(loginUserRoute);
route.use(logoutUserRoute);
route.use(getUserRoute);
route.use(deleteUserRoute);
route.use(createNewUserTokenRoute);
route.use(confirmUserEmailRoute);
route.use(updateUserConfirmationCode);

module.exports = route;