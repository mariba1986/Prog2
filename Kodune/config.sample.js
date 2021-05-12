const config = {
    port: 3300,
    saltRounds: 10,
    jwtSecret: 'secret',
    db: {
        host: 'localhost',
        user: 'root',
        password: 'yourPass',
        database: 'yourDB',
        port: 3306,
    },
};

module.exports = config;
module.exports = config;

   //config.sample.js on selleks, et kui keegi meie koodi kasutab, siis näeks mis struktuuriga sconfig fail olema peab