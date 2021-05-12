//const database = require('../../database');
//const { lectures } = require('../../database');
const { lecturesService } = require('../services/');
const lecturesController = {};

lecturesController.getLectures = async (req, res) => {
    const lectures = await lecturesService.getLectures();
    res.status(200).json({
        lectures,
    });
};

lecturesController.getLectureById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const lecture = await lecturesService.getLectureById(id);
    if (lecture) {
        res.status(200).json({
            lecture,
        });
    } else {
        res.status(400).json({
            error: `No lectures found with id: ${id}`,
        });
    }
};


lecturesController.createLecture = async (req, res) => {
    const { description } = req.body;
    if (description) {
        const lecture = {
            description,
        };
        const id = await lecturesService.createLecture(lecture);
        if (id) {
            res.status(201).json({
                id,
            });
        } else {
            res.status(500).json({
                error: 'Something went wrong',
            });
        }
    } else {
        res.status(400).json({
            error: 'Description is missing',
        });
    }
};

lecturesController.updateLecture = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
        const lecture = lecturesService.getLectureById(id);
        if (lecture) {
            const lectureToUpdate = {
                id,
                description,
            };
            const success = await lecturesService.updateLecture(lectureToUpdate);
            if (success) {
                res.status(200).json({
                    success: true,
                });
            } else {
                res.status(500).json({
                    error: 'Something went wrong while updating lecture',
                });
            }
        } else {
            res.status(400).json({
                error: `No lecture found with id: ${id}`,
            });
        }
    } else {
        res.status(400).json({
            error: 'No description provided',
        });
    }
};


lecturesController.deleteLecture = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const lecture = lecturesService.getLectureById(id);
    if (lecture) {
        const success = await lecturesService.deleteLecture(id);
        if (success) {
            res.status(204).end();
        }
        else {
            res.status(500).json({
                error: 'Something went wrong. Try again',
            });
        }
    } else {
        res.status(400).json({
            error: `No lectures found with id: ${id}`,
        });
    }
};

module.exports = lecturesController;