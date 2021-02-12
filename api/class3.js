const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = './database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// get '/reservations-and-invoices/'
// TODO: add code here

router.delete('/reservations/:id/', function(req, res) {
  const id = req.params.id;
  const sql = 'delete from reservations where id = ' + id;

  db.run(sql, (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});

// get `/reservations-per-customer/`
// TODO: add code here


// HOMEWORK
// get '/reservations/details-between/:from_day/:to_day'
// TODO: add for code here

// HOMEWORK
// get '/reservations-per-customer/'
// TODO: add code here

// HOMEWORK
// get `/stats-price-room/`
// TODO: add code here

// HOMEWORK
// get `/rooms/available-in/:from_day/:to_day`
// TODO: add code here


module.exports = router;
