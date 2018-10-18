const express = require('express');
const router = express.Router();

const {accounts, users, writeJSON, writeUserJSON} = require('../data');

router.get('/transfer', function(req, res) {
    res.render('transfer');
});

router.post('/transfer', function(req, res) {
    accounts[req.body.from].prior_balance = accounts[req.body.from].balance;
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].prior_balance =  accounts[req.body.to].balance;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', function (req, res) {
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', function(req, res) {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit });
});

router.get('/addMoney', function(req, res) {
   res.render('addMoney');
});

router.post('/addMoney', function (req, res) {
    accounts[req.body.to].prior_balance =  accounts[req.body.to].balance;
   accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
   writeJSON();
    res.render('addMoney', {message: 'Money Added !!'});
});

router.get('/editProfile', function(req, res) {
    res.render('editProfile', {user: users[0]});
});

router.post('/editProfile', function (req, res) {
   users[0].name = req.body.name;
   users[0].email = req.body.email;
    users[0].phone = req.body.phone;
    users[0].address = req.body.address;
    writeUserJSON();
    res.render('editProfile', {message: 'Profile edited', user: users[0]});
});

module.exports = router;
