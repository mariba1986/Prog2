const database = require('../../database');

const teachersService = {};

teachersService.getTeachers = () => {
    const { teachers } = database;
    return teachers;
};

teachersService.getTeacherById = (id) => {
    const teacher = database.teachers.find((element) => element.id === id);
    if (teacher) {
        return teacher;
    }
    return false;
};

teachersService.createTeacher = (newTeacher) => {
    const id = database.teachers.length + 1;
    const teacher = {
        id,
        ...newTeacher,
    };
    database.teachers.push(teacher);
    return id;
};

teachersService.deleteTeacher = (id) => {
    const index = database.teachers.findIndex((element) => element.id === id);
    database.teachers.splice(index, 1);
    return true;
};

teachersService.updateTeacher = (teacher) => {
    const index = database.teachers.findIndex((element) => element.id === teacher.id);
    if (teacher.name) {
        database.teachers[index].name = teacher.name;
    }
    return true;
};

module.exports = teachersService;