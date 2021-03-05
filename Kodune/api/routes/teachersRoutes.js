const express = require('express');
const teachersController = require('../controllers/teachersController');

const router = express.Router();

router.get('/', teachersController.getTeachers);
router.get('/:id', teachersController.getTeacherById);
router.post('/', teachersController.createTeacher);
router.patch('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;