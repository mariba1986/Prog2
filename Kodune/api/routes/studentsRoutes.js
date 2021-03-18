const express = require('express');
const { studentsController } = require('../controllers');

const router = express.Router();
const { validators } = require('../middlewares');

/**
 * Students API endpoints
 */
router
  .get('/', studentsController.getStudents)
  .get('/:id', studentsController.getStudentById)
  .post('/', studentsController.createStudent)
  .patch('/:id', studentsController.updateStudent)
  .delete('/:id', studentsController.deleteStudent);

module.exports = router;
