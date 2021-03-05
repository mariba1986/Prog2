const express = require('express');
const { studentsController } = require('../controllers');

const router = express.Router();
const { validators } = require('../middlewares');

/**
 * Students API endpoints
 */
router
  .get('/', studentsController.getStudents)
  .get('/:id', validators.getStudentById, studentsController.getStudentById)
  .post('/', validators.createStudent, studentsController.createStudent)
  .patch('/:id', studentsController.updateStudent)
  .delete('/:id', studentsController.deleteStudent);

module.exports = router;
