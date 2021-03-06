const express = require('express');
const config = require('./config'); //kui config fail on samas kaustas kui index fail, siis ./ ja pakub.
//const database = require('./database');
//const studentsController = require('./api/controllers/studentsController');
//const lecturesController = require('./api/controllers/lecturesController');
//const teachersController = require('./api/controllers/teachersController');
const {
    lecturesRoutes,
    studentsRoutes,
    teachersRoutes,
} = require('./api/routes');

const { port } = config || 3300;
const { logger } = require('./api/middlewares');
const app = express();
//const studentsRoutes = require('./api/routes/studentsRoutes');
//const teachersRoutes = require('./api/routes/teachersRoutes');


//console.log(config);
app.use(express.json());
app.use(logger);


// Routes
app.use('/teachers', teachersRoutes);
app.use('/lectures', lecturesRoutes);
app.use('/students', studentsRoutes);



/*app.get('/tere', (req, res) => { //esimene, testimiseks.
    res.status(200).json({ message: 'Tere!' });
});

app.get('/', (req, res) => { //kõik koos
    res.status(200).json();
});*/
/*
//Students CRUD
app.get('/students', studentsController.getStudents);
app.get('/students/:id', studentsController.getStudentsById);
app.post('/students', studentsController.createStudent);
app.patch('/students/:id', studentsController.changeStudent);
app.delete('/students/:id', studentsController.deleteStudent);

//Teachers
app.get('/teachers', teachersController.getTeachers);
app.post('/teachers', teachersController.createTeachers);
app.patch('/teachers/:id', teachersController.changeTeachers);
app.delete('/teachers/:id', teachersController.deleteTeachers);

//Lectures
app.get('/lectures', lecturesController.getLectures);
app.post('/lectures', lecturesController.createLectures);
app.patch('/lectures/:id', lecturesController.changeLectures);
app.delete('/lectures/:id', lecturesController.deleteLectures);*/

app.listen(port, () => {
    console.log('Server is running on port:', port);
});