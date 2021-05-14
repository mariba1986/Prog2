const { studentsService } = require('../services');

const studentsController = {};

/**
 * Get all students
 * GET - /students
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of students
 */
studentsController.getStudents = async (req, res) => {
  const students = await studentsService.getStudents();
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
studentsController.getStudentById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = await studentsService.getStudentById(id);
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
studentsController.createStudent = async (req, res) => {
  const { name, description } = req.body;
  const createdById = req.userId;
  if (!name || !description) {
    return res.status(400).json({
      error: 'Name or descritpion is missing',
    });
  }
  const student = {
    name,
    description,
    createdById,
  };
  const id = await studentsService.createStudent(student);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating student',
    });
  }
  return res.status(201).json({
    id: student.id,
  });
};

/**
 * Delete student
 * DELETE - /students/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */

studentsController.deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  const student = await studentsService.getStudentById(id);
  if (!student) {
    return res.status(400).json({
      error: `No student found with id: ${id}`,
    });
  }
  if (!(student.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to delete this student',
    });
  }
  const success = await studentsService.deleteStudent(id);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while deleting student',
    });
  }
  return res.status(204).end();
};
/**
 * Update student
 * PATCH - /students/:id
 * Required values: id, firstName OR lastName
 * Optional values: firstName, lastName
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
studentsController.updateStudent = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, name } = req.body;
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  // Check if student exists
  const student = await studentsService.getStudentById(id);
  if (!student) {
    res.status(400).json({
      error: `No student found with id: ${id}`,
    });
  }
  if (!(student.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to update this student',
    });
  }
  if (!(description || name)) {
    return res.status(400).json({
      error: 'No required data provided',
    });
  }
  const studentToUpdate = {
    id,
    description,
    name,
  };
  const success = await studentsService.updateStudent(studentToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating student',
    });
  }
  return res.status(200).json({
    success,
  });
};

module.exports = studentsController;
