const database = {

    students: [
        {
            id: "RIF1",
            description: "Rakendusinformaatika 1. kursus",
        },
        {
            id: "KTD1",
            description: "Käsitöötehnoloogiad ja disain 1. kursus",
        },
        {
            id: "LO1",
            description: "Liiklusohutus 1. kursus",
        },
        {
            id: "Tervisejuht1",
            description: "Tervisejuht1Tervisejuht 1. kursus",
        },
    ],

    lectures: [
        {
            id: 1,
            description: "Tehniliste jooniste vormistamine",
        },
        {
            id: 2,
            description: "Sissejuhatus disaini",
        },
        {
            id: 3,
            description: "Erialane arvutiõpetus",
        },
        {
            id: 4,
            description: "Programmeerimine",
        },
    ],

    teachers: [
        {
            id: 1,
            name: "Laura Hein",
        },
        {
            id: 2,
            name: "Martti Raavel",
        },
        {
            id: 3,
            name: "Andrus Rinde",
        },
        {
            id: 4,
            name: "Liina Viiret",
        },
    ],
    users: [
        {
            id: 1,
            firstName: 'Juku',
            lastName: 'Juurikas',
            email: 'juku@juurikas.ee',
            password: 'juku',
            role: 'User',
        },
        {
            id: 2,
            firstName: 'Mati',
            lastName: 'Maasikas',
            email: 'mati@maasikas.ee',
            password: 'mati',
            role: 'Admin',
        },
        {
            id: 3,
            firstName: "Maris",
            lastName: "Riba",
            email: "mariba@tlu.ee",
            password: "$2b$10$iN3i4suHJXsnKQTKoeHlIuPE/nvIHv.4Vb66FoK3lvgzCXrcs.Pr2",
            role: "Admin"
        }
    ],
};

module.exports = database;