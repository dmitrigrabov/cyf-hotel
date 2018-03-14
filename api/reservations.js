const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require("body-parser");
const filename = './database/mydatabase.sqlite';
let db = new sqlite3.Database(filename);
const router = express.Router();
// app.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());
router.get('/reservations/', function(req, res) {
    var sql = 'select * from reservations';
    db.all(sql, [], (err, rows) => {
        res.status(200).json({
            reservations: rows
        });
    });
});
router.get('/reservations/:id', function(req, res) {
    // TODO: add code here
    var sql = 'select * from reservations where id = ' + req.params.id;
    console.log(sql)
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
        } else {
            res.status(200).json({
                reservations: rows
            });
        }
    });
});
router.post('/reservations/', (req, res) => {
    // TODO: add code here
    console.log(req.body)
    const sql = "insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (?, ?, ?, ?, ?)";
    db.run(sql, [req.body.customer_id, req.body.room_id, req.body.check_in_date, req.body.check_out_date, req.body.price], (err, rows) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json({
                reservations: rows
            });
        };
    });
});
router.put('/reservations/:id', function(req, res) {
    // TODO: add code here
    console.log(req.body)
    const sql = "UPDATE reservations SET customer_id, room_id, check_in_date=?, check_out_date=?, price=? WHERE id=?"
    console.log(sql)
    db.run(sql, req.body.customer_id, req.body.room_id, req.body.check_in_date, req.body.check_out_date, req.body.price, req.params.id, (err, rows) => {
      console.log(rows)
        if (err) {
            res.status(500).end();
            console.log(err)
        } else {
            res.status(200).json({
                reservations: rows
            });
        };
    });
});

router.delete('/reservations/:id', function(req, res) {
    // TODO: add code here
    const sql = "DELETE FROM reservations WHERE id=?"
    db.run(sql, req.params.id, (err, rows) => {
        if (err) {
            res.status(500).end();
            console.log(err)
        } else {
            console.log(req.body)
            res.status(200).send()
        };
    });
});

router.get('/reservations/starting-on/:startDate', function(req, res) {
    // console.log(req.params.startDate)
    // const datePart = req.params.startDate.match(/\d+/g),
    //     year = datePart[0].substring(0),
    //     month = datePart[1],
    //     day = datePart[2];
    // const date = '"' + day + '/' + month + '/' + year + '"';
    // console.log(date)
    var sql = 'select * from reservations where check_in_date =' + req.params.startDate;
    console.log(sql)
    db.all(sql, [], (err, rows) => {
        console.log(rows)
        if (err) {
            console.log(err)
            res.status(500)
        } else {
            res.status(200).json({
                reservations: rows
            });
        };
    });
});
router.get('/reservations/active-on/:date', function(req, res) {
    var sql =`select * from reservations 
              where 
              check_in_date <= '${req.params.date}'
              and 
              check_out_date >= '${req.params.date}'`;
    console.log(sql)
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
        } else {
          console.log(rows)
            res.status(200).json({
                reservations: rows
            });
        };
    });
});

module.exports = router;