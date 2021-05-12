const express = require('express');
const {
    lecturesRoutes,
    studentsRoutes,
    teachersRoutes,
    usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');

const app = express();

// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/lectures', lecturesRoutes);
app.use('/users', usersRoutes);
app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);

module.exports = app;
