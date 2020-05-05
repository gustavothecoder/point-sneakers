const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('users.json');
const database = lowdb(adapter);

const test = database.get('users')
    .find({email: "gustavo.ribeiro@hotmail.com"})
    .value();

console.log(test);