const express = require('express');
const app = express();

const port = 3300;

const students = [
    {
        id: 1,
        description: "RIF1"
    },
    {
        id: 2,
        description: "KTD1"
    },
    {
        id: 3,
        description: "LO1"
    },
    {
        id: 4,
        description: "Tervisejuht1"
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

app.get('/students', (req, res) => {
    res.status(200).json({ students: students });
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

app.listen(port, () => {
    console.log('Server is running on port:', port);
});