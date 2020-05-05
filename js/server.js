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
    const validationResult = VerifyAccountExistenceWithEmail(req.body.email);
    if (validationResult === undefined) {
        AddAccount(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.redirect('../#pages/login.html');
    } else {
        res.redirect('../#pages/errorPages/createAccountError.html');
    }
    res.end();
});

function VerifyAccountExistenceWithEmail(email) {
    const searchResult = usersDatabase.get('users')
        .find({email})
        .value();
    return searchResult;
}

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