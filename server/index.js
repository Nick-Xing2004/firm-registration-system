//setting up the express server 
const express = require('express'); //get the instance of the express library
const app = express();
const mysql = require('mysql2');   //import the mysql database 
const cors = require('cors');

app.use(cors());

app.use(express.json());


const db = mysql.createConnection({     //connecting to the database you are about to use
    user: 'root',
    host: 'localhost',
    password: 'Nick2004%',
    database: 'employeeSystem'
});


app.post('/create', (req, res) => {
    const name = req.body.name;        
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)', 
    [name, age, country, position, wage], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted!");
        }
    });
});

//building the getting route to retrieve data from the server 
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {      
        if (err) {
            console.log(err);
        } else {
            res.send(result);       //the result is an array of objs     
        }
    });
});




app.listen(3001, () => {
    console.log('yey, the server is now running on port 3001');
});
//running the server by entering node the name of the file.js
