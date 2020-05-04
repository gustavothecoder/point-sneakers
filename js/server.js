const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database/users.json');
const usersDatabase = lowdb(adapter);

app.use(express.static('.'));

app.listen(8080, () => console.log('Executing...'));

app.use(express.urlencoded({extended: true}));

app.post('/createAccount', function(req, res) {
    AddAccount(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    res.redirect('http://localhost:8080/');
    res.end();
});

function AddAccount(firstName, lastName, email, password) {
    usersDatabase.get('users')
        .push({
            firstName,
            lastName,
            email,
            password
        })
        .write()
}