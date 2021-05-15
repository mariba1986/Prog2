
const { expect } = require('chai');
const { teachersService } = require('../api/services');

let teachers;

const existingTeacher = {
  id: 1,
  name: 'Laura Hein'
};

describe('Teachers service', function () {
  describe('GetTeachers', function () {
    it('should return array of teachers', async function () {
      teachers = await teachersService.getTeachers();
      expect(teachers).to.be.a('array');
    });
    it('should contain at least 1 teacher', async function () {
      expect(teachers.length).to.be.gt(1);
    });
  });
  describe('GetTeacher by ID', function () {
    it('should return teacher object with keys', async function () {
      const teacher = await teachersService.getTeacherById(existingTeacher.id);
      expect(teacher).to.be.a('object');
      expect(teacher).to.have.keys(['id','lectureId', 'name']);
    });
  });
});
