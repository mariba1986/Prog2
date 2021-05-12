
const config = require('./config'); //kui config fail on samas kaustas kui index fail, siis ./ ja pakub.
//const database = require('./database');
//const studentsController = require('./api/controllers/studentsController');
//const lecturesController = require('./api/controllers/lecturesController');
//const teachersController = require('./api/controllers/teachersController');
const app = require('./app');

const { port } = config || 3300;

/*app.get('/tere', (req, res) => { //esimene, testimiseks.
    res.status(200).json({ message: 'Tere!' });
});

app.get('/', (req, res) => { //kõik koos
    res.status(200).json();
});*/

app.listen(port, () => {
    console.log('Server is running on port:', port);
});