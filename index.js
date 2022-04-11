const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//07-serving-static-files
app.use(express.static('public'));

let pool = mysql.createPool({
    conectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'ss511128',
    database: 'school'
});


let sql = 'CREATE TABLE IF NOT EXISTS student';
sql = sql.concat('（id int NOT NULL AUTO_INCEMENT PRIMARY KEY,');
sql = sql.concat('first_name varchar (30), last_name varchar (30))');

pool.query(sql, (err, data) => {
    if (err) {
        return console.error('error:' + err.message);
    }
    console, log('Connected to MySQL');
});

//http code, method 
// get-query 
app.get('/api/:id', function(req, res) {
    let sql = "SELECT * FROM student WHERE id= ?";
    pool.query(sql, [req.params.id], (err, data) => {
        if (err) {
            res.status(404).json({ error: "id not found" });
        } else {
            res.json(data);

        }
    });
});

// post-query
app.post('/api/', function(req, res) {
    let sql = "INSERT INTO student (first_name) (last_name)VALUES(?, ?)";
    pool.query(sql, [req.body.firstname, req.body.lastname], (err, data) => {
        if (err) {
            console.log(err);
            res.Status(404).json({ error: err.sqlMessage });
        } else {
            res.json({ insertId: data.insertID });

        }
    });
});


//delete query
app.delete('/api/:id', function(req, res) {
    let sql = "DELETE FROM student WHERE id=?";
    pool.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).json({ error: "id not found" });
        } else {
            res.json({ affectedRows: data.affectedRows });

        }
    });
});

//put query 
app.put('/api/:id', function(req, res) {

    let sql = "UPDATE student SET firstname= ?, lastname=? WHERE id= ?";
    pool.query(sql, [req.body.firstname, req.body.lastname, req.params.id], (err, data) => {
        if (err) {
            console.log(err);
            res.Status(404).json({ error: "id not found" })
        } else {
            res.json({ affectRows: data.affectedRows });

        }
    });
});



// Localhost:3000
var server = app.listen(3000, function() {
    console.log("Server is up and listening on 3000...");
});