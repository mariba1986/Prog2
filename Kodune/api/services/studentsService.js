const db = require('../../db');


const studentsService = {};

// Returns list of students
studentsService.getStudents = async () => {
    const students = await db.query('SELECT id,name, description FROM students where deleted = 0');
    return students;
};

// Find student by id. Returns student if found or false.
studentsService.getStudentById = async (id) => {
    const student = await db.query('SELECT id,name, description FROM students WHERE id = ? AND deleted = 0', [id]);
    if (!student[0]) return false;
    return student[0];
};


// Creates new student, returns id on new student
studentsService.createStudent = async (newStudent) => {
    const existingStudent = await studentsService.getStudentById(newStudent.id);
    if (existingStudent) {
        return { error: 'This student already exists' };
    }
    const student = {
        id: newStudent.id,
        name: newStudent.name,
        description: newStudent.description,
    };
    const result = await db.query('INSERT INTO students SET ?', [student]);
    return { id: result.insertId };
};

// Deletes student
studentsService.deleteStudent = async (id) => {
    await db.query('UPDATE students SET deleted = 1 WHERE id = ?', [id]);
    return true;
};

// Updates student
studentsService.updateStudent = async (student) => {
    const studentToUpdate = {};
    if (student.description) {
        studentToUpdate.description = student.description;
    }
    if (student.name) {
        studentToUpdate.name = student.name;
    }
    await db.query('UPDATE students SET ? WHERE id = ?', [studentToUpdate, student.id]);
    return true;
};

module.exports = studentsService;