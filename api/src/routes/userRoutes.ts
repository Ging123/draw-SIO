import express from 'express';

const route = express.Router();
const createUserRoute = require('../use_cases/user/create/controller');

route.use(createUserRoute);

module.exports = route;