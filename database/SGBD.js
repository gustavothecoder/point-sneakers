const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('users.json');
const database = lowdb(adapter);

database.get('users')
    .remove({email: "Test@gmail.com"})
    .write();