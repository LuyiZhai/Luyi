// student.js - student route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function(req, res) {
    res.send('student home page');
})

// About page route.
router.get('/about', function(req, res) {
    res.send('About this student');
})

module.exports = router;

var student = require('./student.js');
// to use this route module
app.use('/student', student);

//route function 
router.get('/about', function(req, res) {
    res.send('About this student');
})