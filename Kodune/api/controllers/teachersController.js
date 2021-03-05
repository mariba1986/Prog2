const { teachersService } = require('../services');

const teachersController = {};



teachersController.getTeachers = (req, res) => {
    const teachers = teachersService.getTeachers();
    res.status(200).json({
        teachers,
    });
};

teachersController.getTeacherById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const teacher = teachersService.getTeacherById(id);
    if (teacher) {
        res.status(200).json({
            teacher,
        });
    } else {
        res.status(400).json({
            error: `No teacher found with id: ${id}`,
        });
    }
};

teachersController.createTeacher = (req, res) => {
    const { name } = req.body;
    if (name) {
        const teacher = {
            name,
        };
        const id = teachersService.createTeacher(teacher);
        res.status(201).json({
            id,
        });
    } else {
        res.status(400).json({
            error: 'Name is missing',
        });
    }
};

teachersController.deleteTeacher = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const teacher = teachersService.getTeacherById(id);
    if (teacher) {
        const success = teachersService.deleteTeacher(id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(500).json({
                error: 'Something went wrong with deleting the teacher',
            });
        }
    } else {
        res.status(400).json({
            error: `No teacher found with id: ${id}`,
        });
    }
};

teachersController.updateTeacher = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (id && name) {
        const teacher = teachersService.getTeacherById(id);
        if (teacher) {
            const teacherToUpdate = {
                id,
                name,
            };
            const success = teachersService.updateTeacher(teacherToUpdate);
            if (success) {
                res.status(200).json({
                    success: true,
                });
            } else {
                res.status(500).json({
                    error: 'Something went wrong while updating the teacher!',
                });
            }
        } else {
            res.status(400).json({
                error: `No teacher found with id: ${id}`,
            });
        }
    } else {
        res.status(400).json({
            error: 'Id or name is missing!',
        });
    }
};

module.exports = teachersController;