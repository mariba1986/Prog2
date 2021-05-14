const jwtService = require('./jwtService');
const hashService = require('./hashService');
const db = require('../../db');

const teachersService = {};

//tagastab õppejõud - id ja nimi.

teachersService.getTeachers = async () => {
    const teachers = await db.query('SELECT id, name FROM teachers where deleted = 0');
    return teachers;
};

//leiab andmebaasist õppejõu ID alusel
teachersService.getTeacherById = async (id) => {
    const teacher = await db.query('SELECT id, name, lectureId FROM teachers WHERE id = ? AND deleted = 0', [id]);
    if (!teacher[0]) return false;
    return teacher[0];
};


//loome uue õppejõu, tagastame id
teachersService.createTeacher = async (newTeacher) => {
    const existingTeacher = await teachersService.getTeacherById(newTeacher.id);
    if (existingTeacher) {
        return { error: 'This teacher already exists' };
    }
    const teacher = {
        id: newTeacher.id,
        name: newTeacher.name,
        lectureId: newTeacher.lectureId
    };

    const result = await db.query('INSERT INTO teachers SET ?', [teacher]);
    return { id: result.insertId };
};

//õppejõu kustutamine
teachersService.deleteTeacher = async (id) => {
    await db.query('DELETE FROM teachers WHERE id = ?', [id]);
    //console.log(result);
    return true;
};

//õppejõu muutmine
teachersService.updateTeacher = async (teacher) => {
    await db.query('UPDATE teachers SET name = ? WHERE id = ?', [teacher.name, teacher.id]);
    return true;
};

module.exports = teachersService;