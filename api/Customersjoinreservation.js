const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require("body-parser");
const cors = require("cors");

const filename = './database/mydatabase.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();
router.use(cors());
router.use(bodyparser.json());


router.get('/Customersjoinreservation', function (req, res) {
    var sql = `select customers.id, customers.title, customers.firstname, customers.surname,customers.email,reservations.room_id, reservations.check_in_date ,reservations.check_out_date from reservations join customers on reservations.customer_id = customers.id`;
    db.all(sql, [], (err, rows) => {
        res.status(200).json({
            customers: rows
        });
    });
});

module.exports = router;