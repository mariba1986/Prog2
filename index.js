const express = require('express');
const app = express();

const port = 3000;

const excuses = [
    {
        id: 1,
        description: "Ei tahtnud teha"
    },
    {
        id: 2,
        description: "Ei osanud"
    },
    {
        id: 3,
        description: "Ei viitsinud"
    },
    {
        id: 4,
        description: "Ei teadnud et peab"
    },
];


app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello world!' }); //expressi funktsioonid, vastuseks on json
});

app.get('/excuses', (req, res) => {
    res.status(200).json({ excuses: excuses });
});

app.get('/excuses/:id', (req, res) => {
    const id = req.params.id;
    const excuse = excuses[id -1];
    res.status(200).json({
        excuse: excuse
    });
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
})