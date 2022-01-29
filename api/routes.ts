import express from 'express';

const routes = express.Router();
const userRoutes = require('./src/routes/userRoutes');

routes.use('/user', userRoutes);

export default routes;