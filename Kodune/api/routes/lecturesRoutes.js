/* const express = require('express');
const { lecturesController } = require('../controllers');

const router = express.Router();

router
    .get('/', lecturesController.getLectures)
    .get('/:id', lecturesController.getLectureById)
    .post('/', lecturesController.createLecture)
    .patch('/:id', lecturesController.updateLecture)
    .delete('/:id', lecturesController.deleteLecture);

module.exports = router; */


const express = require('express');
const lecturesController = require('../controllers/lecturesController');

const router = express.Router();

router.get('/', lecturesController.getLectures);
router.get('/:id', lecturesController.getLectureById);
router.post('/', lecturesController.createLecture);
router.patch('/:id', lecturesController.updateLecture);
router.delete('/:id', lecturesController.deleteLecture);

module.exports = router;
