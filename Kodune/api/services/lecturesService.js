
const db = require('../../db');

const lecturesService = {


};

lecturesService.getLectures = async () => {
    const lectures = await db.query('SELECT id, description FROM lectures where deleted = 0');
    return lectures;
};

lecturesService.getLectureById = async (id) => {
    const lecture = await db.query('SELECT id, description FROM lectures WHERE id = ? AND deleted = 0', [id]);
    if (!lecture[0]) return false;
    return lecture[0];
};

lecturesService.createLecture = async (newLecture) => {
    const existingLecture = await lecturesService.getLectureById(newLecture.id);
    if (existingLecture) {
        return { error: 'This lecture already exists' };
    }
    const lecture = {
        id: newLecture.id,
        description: newLecture.description,
    };
    const result = await db.query('INSERT INTO lectures SET ?', [lecture]);
    return { id: result.insertId };
};


lecturesService.updateLecture = async (lecture) => {
    await db.query('UPDATE lectures SET description = ? WHERE id = ?', [lecture.description, lecture.id]);
    return true;
};

lecturesService.deleteLecture = async (id) => {
    await db.query('DELETE FROM lectures WHERE id = ?', [id]);
    return true;
};




module.exports = lecturesService;