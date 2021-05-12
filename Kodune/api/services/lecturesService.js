const database = require('../../database');
const db = require('../../db');

const lecturesService = {


};

lecturesService.getLectures = () => {
    const { lectures } = database;
    return lectures;
};

lecturesService.getLectureById = (id) => {
    const lecture = database.lectures.find((element) => element.id === id);
    if (lecture) {
        return lecture;
    }
    return false;
};

lecturesService.createLecture = (newLecture) => {
    const id = database.lectures.length + 1;
    const lecture = {
        id,
        ...newLecture,
    };
    database.lectures.push(lecture);
    return id;
};

lecturesService.updateLecture = (lecture) => {
    const index = database.lectures.findIndex((element) => element.id === lecture.id);
    if (lecture.description) {
        database.lectures[index].description = lecture.description;
    }
    return true;
};

lecturesService.deleteLecture = (id) => {
    const index = database.lectures.findIndex((element) => element.id === id);
    database.lectures.splice(index, 1);
    return true;
};



module.exports = lecturesService;