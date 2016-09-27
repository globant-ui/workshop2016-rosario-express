const colors = require('colors/safe');
const Database = require('../database/Database');
const dataBase = require('../database/Database').instance;

dataBase.remove({}, { multi: true })
    .then(removeCount => {
        if (removeCount) {
            console.log(colors.green(`Done. ${removeCount} entries were removed.`));
        } else {
            console.log(colors.yellow(`There's no data to remove. Database is empty.`));
        }
    })
    .catch(error => {
        console.log(colors.red('Can\'t remove data from the Database. Printing error.'));
        console.log(error);
    });
