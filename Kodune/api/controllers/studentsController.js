const { studentsService } = require('../services');

const studentsController = {};

/**
 * Get all students
 * GET - /students
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of students
 */
studentsController.getStudents = (req, res) => {
  const students = studentsService.getStudents();
  res.status(200).json({
    students,
  });
};

/**
 * Get student by student id
 * GET - /students/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and student with specified id
 * Error: status 400 - Bad Request and error message
 */
studentsController.getStudentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = studentsService.getStudentById(id);
  if (student) {
    res.status(200).json({
      student,
    });
  } else {
    res.status(400).json({
      error: `No student found with id: ${id}`,
    });
  }
};

/**
 * Create new student
 * POST - /students
 * Required values: firstName, lastName
 * Optional values: none
 * Success: status 201 - Created and id of created student
 * Error: status 400 - Bad Request and error message
 */
studentsController.createStudent = (req, res) => {
  const { firstName, lastName } = req;
  if (firstName && lastName) {
    const student = {
      firstName,
      lastName,
    };
    const id = studentsService.createStudent(student);
    if (id) {
      res.status(201).json({
        id,
      });
    } else {
      res.status(500).json({
        error: 'Something went wrong while creating student.',
      });
    }
  }
};

/**
 * Delete student
 * DELETE - /students/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
studentsController.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if student exists
  const student = studentsService.getStudentById(id);
  if (student) {
    const success = studentsService.deleteStudent(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting student',
      });
    }
  } else {
    res.status(400).json({
      error: `No student found with id: ${id}`,
    });
  }
};

/**
 * Update student
 * PATCH - /students/:id
 * Required values: id, firstName OR lastName
 * Optional values: firstName, lastName
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
studentsController.updateStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;
  if (id && (firstName || lastName)) {
    const student = studentsService.getStudentById(id);
    if (student) {
      const studentToUpdate = {
        id,
        firstName,
        lastName,
      };
      const success = studentsService.updateStudent(studentToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating student',
        });
      }
    } else {
      res.status(400).json({
        error: `No student found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id, firstName or lastName is missing',
    });
  }
};

module.exports = studentsController;
