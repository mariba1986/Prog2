const express = require('express');
const app = express();

const port = 3300;

const students = [
    {
        id: "RIF1",
        description: "Rakendusinformaatika 1. kursus"
    },
    {
        id: "KTD1",
        description: "Käsitöötehnoloogiad ja disain 1. kursus"
    },
    {
        id: "LO1",
        description: "Liiklusohutus 1. kursus"
    },
    {
        id: "Tervisejuht1",
        description: "Tervisejuht1Tervisejuht 1. kursus"
    },
];

const lectures = [
    {
        id: 1,
        description: "Tehniliste jooniste vormistamine"
    },
    {
        id: 2,
        description: "Sissejuhatus disaini"
    },
    {
        id: 3,
        description: "Erialane arvutiõpetus"
    },
    {
        id: 4,
        description: "Programmeerimine"
    },
];

const teachers = [
    {
        id: 1,
        description: "Laura Hein"
    },
    {
        id: 2,
        description: "Martti Raavel"
    },
    {
        id: 3,
        description: "Andrus Rinde"
    },
    {
        id: 4,
        description: "Liina Viiret"
    },
];


app.use(express.json());

app.get('/tere', (req, res) => { //esimene, testimiseks.
    res.status(200).json({ message: 'Tere!' });
});

app.get('/', (req, res) => { //kõik koos
    res.status(200).json();
});

//Students CRUD
app.get('/students', (req, res) => {
    res.status(200).json({ students: students });
});

app.get('/students/:id', (req, res) => {
    const key = req.query.key;
    const id = req.params.id;
    const student = students[id - 1];
    res.status(200).json({
        student: student
    });
});

app.post('/students', (req, res) => {
    const description = req.body.description;
    if (description) {
        const student = {
            id: students.length + 1,
            description: description
        };
        students.push(student);
        res.status(201).json({
            id: student.id
        });
    } else {
        res.status(400).json({
            error: 'Description is missing'
        });
    }
});

app.patch('/students/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    students[id - 1].description = description;
    res.status(200).json({
        success: true
    });
});

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    students.splice(id - 1, 1);
    res.status(200).end();
});

//Teachers
app.get('/teachers', (req, res) => {
    res.status(200).json({ teachers: teachers });
});

app.post('/teachers', (req, res) => {
    const description = req.body.description;
    if (description) {
        const teacher = {
            id: teachers.length + 1,
            description: description
        };
        teachers.push(teacher);
        res.status(201).json({
            id: teacher.id
        });
    } else {
        res.status(400).json({
            error: 'Description is missing'
        });
    }
});

app.patch('/teachers/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    teachers[id - 1].description = description;
    res.status(200).json({
        success: true
    });
});

app.delete('/teachers/:id', (req, res) => {
    const id = req.params.id;
    teachers.splice(id - 1, 1);
    res.status(200).end();
});

//Lectures
app.get('/lectures', (req, res) => {
    res.status(200).json({ lectures: lectures });
});

app.post('/lectures', (req, res) => {
    const description = req.body.description;
    if (description) {
        const lecture = {
            id: lectures.length + 1,
            description: description
        };
        lectures.push(lecture);
        res.status(201).json({
            id: lecture.id
        });
    } else {
        res.status(400).json({
            error: 'Description is missing'
        });
    }
});

app.patch('/lectures/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    lectures[id - 1].description = description;
    res.status(200).json({
        success: true
    });
});

app.delete('/lectures/:id', (req, res) => {
    const id = req.params.id;
    lectures.splice(id - 1, 1);
    res.status(200).end();
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});