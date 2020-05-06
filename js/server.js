const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database/users.json');
const adapter2 = new FileSync('database/cart.json');
const usersDatabase = lowdb(adapter);
const cartDatabase = lowdb(adapter2);

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

app.post('/login', function(req, res) {
    const validationResult = ValidateLogin(req.body);
    if (validationResult) {
        res.redirect('../#pages/home.html');
    } else {
        res.redirect('../#pages/errorPages/loginError.html');
    }
    res.end();
});

function ValidateLogin(data) {
    const validateEmailResult = VerifyAccountExistenceWithEmail(data.email);
    if (validateEmailResult === undefined) {
        return false;
    } else {
        const validatePasswordResult = ValidatePassword(data.password, validateEmailResult.password);
        if (validatePasswordResult) {
            return true;
        } else {
            return false;
        }
    }
}

function ValidatePassword(requisitionPassword, validPassword) {
    return requisitionPassword === validPassword;
}

app.post('/addToCart', function(req, res) {
    const searchProductInCartResult = SearchProductInCart(req.body);
    if (searchProductInCartResult) {
        IncreaseProductQuantity(req.body.id);
    } else {
        AddProductInCart(req.body);
    }
    res.end();
});

function SearchProductInCart(product) {
    const productFound = cartDatabase.get('products')
        .find({id: product.id})
        .value();
    if (productFound === undefined) {
        return false;
    } else {
        if (productFound.color === product.color) {
            return true;
        } else {
            return false;
        }
    }
}

function IncreaseProductQuantity(productID) {
    let newQuantity = cartDatabase.get('products')
        .find({productID})
        .value();
    newQuantity = newQuantity.quantity + 1;
    cartDatabase.get('products')
        .find({productID})
        .assign({quantity: newQuantity})
        .write();
}

function AddProductInCart(product) {
    cartDatabase.get('products')
        .push({
            productID: product.sneakerID,
            color: product.color,
            size: product.size,
            quantity: product.quantity
        })
        .write();
}