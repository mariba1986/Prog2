const database = require('../../database');

const studentsService = {};

// Returns list of students
studentsService.getStudents = () => {
    const { students } = database;
    return students;
};

// Find student by id. Returns student if found or false.
studentsService.getStudentById = (id) => {
    const student = database.students.find((element) => element.id === id);
    if (student) {
        return student;
    }
    return false;
};

// Creates new student, returns id on new student
studentsService.createStudent = (newStudent) => {
    const id = database.students.length + 1;
    const student = {
        id,
        ...newStudent,
    };
    database.students.push(student);
    return id;
};

// Deletes student
studentsService.deleteStudent = (id) => {
    // Find student index
    const index = database.students.findIndex((element) => element.id === id);
    // Remove student from 'database'
    database.students.splice(index, 1);
    return true;
};

// Updates student
studentsService.updateStudent = (student) => {
    const index = database.students.findIndex((element) => element.id === student.id);
    if (student.description) {
        database.students[index].description = student.description;
    }
    return true;
};

module.exports = studentsService;