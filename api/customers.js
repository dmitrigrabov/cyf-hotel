const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require("body-parser");

const filename = './database/mydatabase.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

router.use(bodyparser.json());


router.get('/customers', function (req, res) {
  var sql = 'select * from customers';
  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});

router.get('/customers/:id', function (req, res) {
  // TODO: add code here
  var sql = 'select * from customers where id = ' + req.params.id;
  console.log(sql)
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err)
      res.status(500)
    } else {
      res.status(200).json({
        customers: rows
      });
    }
  });
});


router.get('/customers/name/:name', function (req, res) {
  // TODO: add code here

  var sql = 'select  * from customers where surname like \'%' + req.params.name + '%\'';
  console.log(sql)
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err)
      res.status(500)
    } else {
      res.status(200).json({
        customers: rows
      });
    }
  });
});


router.post('/customers/', (req, res) => {
  // TODO: add code here
  console.log(req.body)
  const sql = "insert into customers (title, firstname, surname, email) values (?, ?, ?, ?)";
  db.run(sql, [req.body.title, req.body.firstname, req.body.surname, req.body.email], (err, rows) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).json({
        customers: rows
      });
    };
  });
});

router.put('/customers/:id', function (req, res) {
  console.log(req.body)
  const esql = "select * from customers where id=" + req.params.id;
  db.all(esql, [], (err, rows) => {
    const [data] = rows;
    var title;
    var firstname;
    var surname;
    var email;
    const sql = "UPDATE customers SET title=?, firstname=?, surname=?, email=? WHERE id=?"
    if (req.body.title) {
      title = req.body.title;
    } else {
      title = data.title;
    };
    if (req.body.firstname) {
      firstname = req.body.firstname;
    } else {
      firstname = data.firstname;
    };
    if (req.body.surname) {
      surname = req.body.surname;
    } else {
      surname = data.surname;
    };
    if (req.body.email) {
      email = req.body.email;
    } else {
      email = data.email;
    };
    db.run(sql, title, firstname, surname, email, req.params.id, (err, rows) => {
      if (err) {
        res.status(500).end();
        console.log(err)
      } else {
        res.status(200).json({
          customers: rows
        });
      };
    });
  });
});

router.delete('/customers/:id', function (req, res) {
  // TODO: add code here
  const sql = "DELETE FROM customers WHERE id=?"
  db.run(sql, req.body.id, (err, rows) => {
    if (err) {
      res.status(500).end();
      console.log(err)
    } else {
      console.log(req.body)
      res.status(200).json({
        customers: rows
      });
    };
  });
});

router.delete('/customers/name/:name', (req, res) => {
  // TODO: add code here
  const sql = 'DELETE FROM customers where surname like \'%' + req.params.name + '%\'';
  db.run(sql, [], (err, rows) => {
    if (err) {
      res.status(500).end();
      console.log(err)
    } else {
      res.status(200).json({
        customers: rows
      });
    };
  });
});

router.get('/customers/:surname1/:surname2', function (req, res) {
  // TODO: add code here
  var sql = `select * from customers where surname in (\'%' + ${req.params.surname1} + '%\', \'%' + ${req.params.surname2} + '%\')`;
  console.log(sql)
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err)
      res.status(500)
    } else {
      res.status(200).json({
        customers: rows
      });
    }
  });
});

module.exports = router;


  // select reservations.check_in_date, customers.firstname, customers.surname from reservations JOIN customers ON reservations.customer_id = customers.id WHERE reservations.check_in_date = '2014-02-02';
  // select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by duration; 
//sqlite> select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by d
// uration;
// id          customer_id  room_id     check_in_date  check_out_date  price       duration
// ----------  -----------  ----------  -------------  --------------  ----------  ----------
// 11          1            34          2017-01-01     2017-01-08      105         7.0
// 5           5            348         2017-01-01     2017-11-08      500         311.0
// 15          5            348         2017-01-01     2017-11-08      500         311.0
// 3           3            374         2017-05-01     2018-04-08      205         342.0
// 13          3            374         2017-05-01     2018-04-08      205         342.0
// 2           2            65          2014-02-02     2015-11-11      375         647.0
// 12          2            65          2014-02-02     2015-11-11      375         647.0
// 4           4            625         2016-02-02     2018-11-11      275         1013.0
// 14          4            625         2016-02-02     2018-11-11      275         1013.0
// 10          10           158         2011-11-11     2015-11-11      275         1461.0
// 20          10           158         2011-11-11     2015-11-11      275         1461.0
// 8           8            656         2010-12-22     2015-11-11      305         1785.0
// 18          8            656         2010-12-22     2015-11-11      305         1785.0
// 9           9            659         2010-12-13     2015-11-11      175         1794.0
// 19          9            659         2010-12-13     2015-11-11      175         1794.0
// 6           6            658         2010-12-10     2015-11-11      200         1797.0
// 16          6            658         2010-12-10     2015-11-11      200         1797.0
// 7           7            654         2010-12-01     2015-11-11      300         1806.0
// 17          7            654         2010-12-01     2015-11-11      300         1806.0
// sqlite> select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by d
// uration;
// id          customer_id  room_id     check_in_date  check_out_date  price       duration
// ----------  -----------  ----------  -------------  --------------  ----------  ----------
// 11          1            34          2017-01-01     2017-01-08      105         7.0
// 5           5            348         2017-01-01     2017-11-08      500         311.0
// 15          5            348         2017-01-01     2017-11-08      500         311.0
// 3           3            374         2017-05-01     2018-04-08      205         342.0
// 13          3            374         2017-05-01     2018-04-08      205         342.0
// 2           2            65          2014-02-02     2015-11-11      375         647.0
// 12          2            65          2014-02-02     2015-11-11      375         647.0
// 4           4            625         2016-02-02     2018-11-11      275         1013.0
// 14          4            625         2016-02-02     2018-11-11      275         1013.0
// 10          10           158         2011-11-11     2015-11-11      275         1461.0
// 20          10           158         2011-11-11     2015-11-11      275         1461.0
// 8           8            656         2010-12-22     2015-11-11      305         1785.0
// 18          8            656         2010-12-22     2015-11-11      305         1785.0
// 9           9            659         2010-12-13     2015-11-11      175         1794.0
// 19          9            659         2010-12-13     2015-11-11      175         1794.0
// 6           6            658         2010-12-10     2015-11-11      200         1797.0
// 16          6            658         2010-12-10     2015-11-11      200         1797.0
// 7           7            654         2010-12-01     2015-11-11      300         1806.0
// 17          7            654         2010-12-01     2015-11-11      300         1806.0
// sqlite> select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by duration;select *, julianday(check_o
// ut_date) - julianday(check_in_date) as duration from reservations order by duration;^Z
//    ...> ;
// id          customer_id  room_id     check_in_date  check_out_date  price       duration
// ----------  -----------  ----------  -------------  --------------  ----------  ----------
// 11          1            34          2017-01-01     2017-01-08      105         7.0
// 5           5            348         2017-01-01     2017-11-08      500         311.0
// 15          5            348         2017-01-01     2017-11-08      500         311.0
// 3           3            374         2017-05-01     2018-04-08      205         342.0
// 13          3            374         2017-05-01     2018-04-08      205         342.0
// 2           2            65          2014-02-02     2015-11-11      375         647.0
// 12          2            65          2014-02-02     2015-11-11      375         647.0
// 4           4            625         2016-02-02     2018-11-11      275         1013.0
// 14          4            625         2016-02-02     2018-11-11      275         1013.0
// 10          10           158         2011-11-11     2015-11-11      275         1461.0
// 20          10           158         2011-11-11     2015-11-11      275         1461.0
// 8           8            656         2010-12-22     2015-11-11      305         1785.0
// 18          8            656         2010-12-22     2015-11-11      305         1785.0
// 9           9            659         2010-12-13     2015-11-11      175         1794.0
// 19          9            659         2010-12-13     2015-11-11      175         1794.0
// 6           6            658         2010-12-10     2015-11-11      200         1797.0
// 16          6            658         2010-12-10     2015-11-11      200         1797.0
// 7           7            654         2010-12-01     2015-11-11      300         1806.0
// 17          7            654         2010-12-01     2015-11-11      300         1806.0
// id          customer_id  room_id     check_in_date  check_out_date  price       duration
// ----------  -----------  ----------  -------------  --------------  ----------  ----------
// 11          1            34          2017-01-01     2017-01-08      105         7.0
// 5           5            348         2017-01-01     2017-11-08      500         311.0
// 15          5            348         2017-01-01     2017-11-08      500         311.0
// 3           3            374         2017-05-01     2018-04-08      205         342.0
// 13          3            374         2017-05-01     2018-04-08      205         342.0
// 2           2            65          2014-02-02     2015-11-11      375         647.0
// 12          2            65          2014-02-02     2015-11-11      375         647.0
// 4           4            625         2016-02-02     2018-11-11      275         1013.0
// 14          4            625         2016-02-02     2018-11-11      275         1013.0
// 10          10           158         2011-11-11     2015-11-11      275         1461.0
// 20          10           158         2011-11-11     2015-11-11      275         1461.0
// 8           8            656         2010-12-22     2015-11-11      305         1785.0
// 18          8            656         2010-12-22     2015-11-11      305         1785.0
// 9           9            659         2010-12-13     2015-11-11      175         1794.0
// 19          9            659         2010-12-13     2015-11-11      175         1794.0
// 6           6            658         2010-12-10     2015-11-11      200         1797.0
// 16          6            658         2010-12-10     2015-11-11      200         1797.0
// 7           7            654         2010-12-01     2015-11-11      300         1806.0
// 17          7            654         2010-12-01     2015-11-11      300         1806.0
// Error: unrecognized token: "→"
// sqlite> select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by duration;
// id          customer_id  room_id     check_in_date  check_out_date  price       duration
// ----------  -----------  ----------  -------------  --------------  ----------  ----------
// 11          1            34          2017-01-01     2017-01-08      105         7.0
// 5           5            348         2017-01-01     2017-11-08      500         311.0
// 15          5            348         2017-01-01     2017-11-08      500         311.0
// 3           3            374         2017-05-01     2018-04-08      205         342.0
// 13          3            374         2017-05-01     2018-04-08      205         342.0
// 2           2            65          2014-02-02     2015-11-11      375         647.0
// 12          2            65          2014-02-02     2015-11-11      375         647.0
// 4           4            625         2016-02-02     2018-11-11      275         1013.0
// 14          4            625         2016-02-02     2018-11-11      275         1013.0
// 10          10           158         2011-11-11     2015-11-11      275         1461.0
// 20          10           158         2011-11-11     2015-11-11      275         1461.0
// 8           8            656         2010-12-22     2015-11-11      305         1785.0
// 18          8            656         2010-12-22     2015-11-11      305         1785.0
// 9           9            659         2010-12-13     2015-11-11      175         1794.0
// 19          9            659         2010-12-13     2015-11-11      175         1794.0
// 6           6            658         2010-12-10     2015-11-11      200         1797.0
// 16          6            658         2010-12-10     2015-11-11      200         1797.0
// 7           7            654         2010-12-01     2015-11-11      300         1806.0
// 17          7            654         2010-12-01     2015-11-11      300         1806.0
// sqlite> select * from customers order by surname asc limit 2;
// id          title       firstname   surname     email
// ----------  ----------  ----------  ----------  ---------------------
// 5           Mr          Miran       Ahmadi      Miranahmadi@gmail.com
// 15          Mr          Miran       Ahmadi      Miranahmadi@gmail.com
// sqlite>

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ sqlite3 mydatabase.sqlite
// -- Loading resources from C:\Users\Moradi/.sqliterc
// SQLite version 3.22.0 2018-01-22 18:45:57
// Enter ".help" for usage hints.
// sqlite> select * from customers order by surname asc limit 2;
// id          title       firstname   surname     email
// ----------  ----------  ----------  ----------  ---------------------
// 5           Mr          Miran       Ahmadi      Miranahmadi@gmail.com
// 15          Mr          Miran       Ahmadi      Miranahmadi@gmail.com
// sqlite> select * from reservations order by surname asc latest 5;
// Error: near "latest": syntax error
// sqlite> select * from reservations order by surname desc limit 5;
// Error: no such column: surname
// sqlite> select * from reservations desc limit 5;
// id          customer_id  room_id     check_in_date  check_out_date  price
// ----------  -----------  ----------  -------------  --------------  ----------
// 2           2            65          2014-02-02     2015-11-11      375
// 3           3            374         2017-05-01     2018-04-08      205
// 4           4            625         2016-02-02     2018-11-11      275
// 5           5            348         2017-01-01     2017-11-08      500
// 6           6            658         2010-12-10     2015-11-11      200
// sqlite> select * from reservations order by check_in_date desc limit 5;
// id          customer_id  room_id     check_in_date  check_out_date  price
// ----------  -----------  ----------  -------------  --------------  ----------
// 3           3            374         2017-05-01     2018-04-08      205
// 13          3            374         2017-05-01     2018-04-08      205
// 5           5            348         2017-01-01     2017-11-08      500
// 11          1            34          2017-01-01     2017-01-08      105
// 15          5            348         2017-01-01     2017-11-08      500
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = id where reservation.check_in_date > '2018-01-01' and order by customers.surname desc;
// Error: near "order": syntax error
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = id where reservations.check_in_date > '2018-01-01' and order by customers.surname desc;
// Error: near "order": syntax error
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = id where reservations.check_in_date > '2017-01-01' and order by customers.surname desc;
// Error: near "order": syntax error
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = id where reservations.check_in_date > '2017-01-01' order by customers.surname desc;
// Error: ambiguous column name: id
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = customers.id where reservations.check_in_date > '2017-01-01' order by customers.surname desc;
// firstname   surname
// ----------  ----------
// Nona        Karimi
// Nona        Karimi
// sqlite> select customers.firstname, customers.surname from reservations join customers on reservations.customer_id = customers.id where reservations.check_in_date > '2014-01-01' order by customers.surname desc;
// firstname   surname
// ----------  ----------
// Donald      Trump
// Mohsen      Moradi
// Mohsen      Moradi
// Nona        Karimi
// Nona        Karimi
// Mona        Azimi
// Mona        Azimi
// Miran       Ahmadi
// Miran       Ahmadi
// sqlite> select *, julianday(check_out_date) - julianday(check_in_date) as duration from reservations order by duration

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ sqlite3 mydatabase.sqlite
// -- Loading resources from C:\Users\Moradi/.sqliterc
// SQLite version 3.22.0 2018-01-22 18:45:57
// Enter ".help" for usage hints.
// sqlite> select DISTINCT customers.firstname, customers.surname from reservations join customers on reservations.customer_id = customers.id where reservations.check_in_date > '2014-01-01' order by customers.surname desc;
// firstname   surname
// ----------  ----------
// Donald      Trump
// Mohsen      Moradi
// Nona        Karimi
// Mona        Azimi
// Miran       Ahmadi
// sqlite> select DISTINCT check_in_dete where reservations.check_in_date > '2017-06-21' and reservations.check_in_date;
// Error: no such column: check_in_dete
// sqlite> select DISTINCT check_in_dete from reservations where reservations.check_in_date > '2017-06-21' and reservations.check_in_date;
// Error: no such column: check_in_dete
// sqlite> select DISTINCT check_in_dete from reservations where reservations.check_in_date > '2017-06-21' and reservations.check_in_date < '2017-09-23';
// Error: no such column: check_in_dete
// sqlite> select DISTINCT * from reservations where reservations.check_in_date > '2017-06-21' and reservations.check_in_date < '2017-09-23';
// sqlite> select DISTINCT * from reservations where reservations.check_in_date > '2017-01-21' and reservations.check_in_date < '2017-11-23';
// id          customer_id  room_id     check_in_date  check_out_date  price
// ----------  -----------  ----------  -------------  --------------  ----------
// 3           3            374         2017-05-01     2018-04-08      205
// 13          3            374         2017-05-01     2018-04-08      205
// sqlite> select count(*) from customers;
// count(*)
// ----------
// 20
// sqlite> select count(cosromer_id) from reservations JOIN customers ON reservations.customer_id = customers.id;
// Error: no such column: cosromer_id
// sqlite> select count(cosromer_id) from reservations JOIN customers ON reservations.customer_id = 2;
// Error: no such column: cosromer_id
// sqlite> select count(customer_id) from reservations JOIN customers ON reservations.customer_id = 2;
// count(customer_id)
// ------------------
// 40
// sqlite> select count(id) from reservations where reservations.customer_id = 2;
// count(id)
// ----------
// 2
// sqlite> select count(id) from reservations where reservations.customer_id = 1;
// count(id)
// ----------
// 1
// sqlite> select count(id) from reservations where reservations.customer_id = 3;
// count(id)
// ----------
// 2
// sqlite> select count(id) from reservations where reservations.customer_id = 3;

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ del mydatabase.sqlite
// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database\mydatabase.sqlite
// The process cannot access the file because it is being used by another process.

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ sqlite3 mydatabase.sqlite
// -- Loading resources from C:\Users\Moradi/.sqliterc
// SQLite version 3.22.0 2018-01-22 18:45:57
// Enter ".help" for usage hints.
// sqlite> .read hotel.sql
// Error: near line 1: table invoices already exists
// Error: near line 22: table reservations already exists
// Error: near line 45: table customers already exists
// Error: near line 64: table rooms already exists
// Error: near line 83: table reviews already exists
// Error: near line 99: table room_types already exists
// sqlite> select count(id) from reservations where reservations.customer_id = 3;

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ del mydatabase.sqlite

// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ sqlite3 mydatabase.sqlite
// -- Loading resources from C:\Users\Moradi/.sqliterc
// SQLite version 3.22.0 2018-01-22 18:45:57
// Enter ".help" for usage hints.
// sqlite> .read hotel.sql
// sqlite> select count(id) from reservations where reservations.customer_id = 3;
// count(id)
// ----------
// 1
// sqlite> select count(id) from reservations where reservations.customer_id = 6;
// count(id)
// ----------
// 1
// sqlite> select count(id) from reservations where reservations.customer_id = 1;
// count(id)
// ----------
// 1
// sqlite> select surname, count(*) from customers group by surname;
// surname     count(*)
// ----------  ----------
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Moradi      2
// Trump       1
// karim       1
// rashid      1
// siran       1
// sqlite> select surname, count(*) from customers group by surname order by count(*);
// surname     count(*)
// ----------  ----------
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Trump       1
// karim       1
// rashid      1
// siran       1
// Moradi      2
// sqlite> select surname, count(*) from customers group by surname order by count(*) desc;
// surname     count(*)
// ----------  ----------
// Moradi      2
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Trump       1
// karim       1
// rashid      1
// siran       1
// sqlite> select surname, count(*) as amount from customers group by surname order by amount;
// surname     amount
// ----------  ----------
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Trump       1
// karim       1
// rashid      1
// siran       1
// Moradi      2
// sqlite> select surname, count(*) as amount from customers group by surname order by amount desc;
// surname     amount
// ----------  ----------
// Moradi      2
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Trump       1
// karim       1
// rashid      1
// siran       1
// sqlite> select title, count(*) as amount from customers group by title order by amount desc;
// title       amount
// ----------  ----------
// Mr          7
// Mrs         3
// sqlite> select title, count(*) as amount from customers group by title order by amount desc;
// title       amount
// ----------  ----------
// Mr          7
// Mrs         3
// sqlite> select count(surname) from customers;
// count(surname)
// --------------
// 10
// sqlite> select surname, count(*) from customers group by surname having count >= 3;
// Error: no such column: count
// sqlite> select surname, count(*) from customers group by surname having count(*) >= 3;
// sqlite> select surname, count(*) from customers group by surname having count(*) >= 2;
// surname     count(*)
// ----------  ----------
// Moradi      2
// sqlite> select surname, count(*) as amount from customers group by surname having amount >= 2;
// surname     amount
// ----------  ----------
// Moradi      2
// sqlite> select surname, count(*) as amount from customers group by surname having amount >= 1;
// surname     amount
// ----------  ----------
// Ahmadi      1
// Akarimi     1
// Azimi       1
// Karimi      1
// Moradi      2
// Trump       1
// karim       1
// rashid      1
// siran       1
// sqlite> select count(*) as amount from customers group by rese having amount >= 1;

// sqlite> select count(*) as amount from customers join reservations where reservations.customer_id =>2;
// Error: near ">": syntax error
// sqlite> select count(*) as amount from customers join reservations where reservations.customer_id >=2;
// amount
// ----------
// 100
// sqlite> select count(coustomers.id) as amount from customers join reservations where reservations.customer_id >=2;
// Error: no such column: coustomers.id
// sqlite> select count(customers.id) as amount from customers join reservations where reservations.customer_id >=2;
// amount
// ----------
// 100
// sqlite> select count(customers.id) as amount from customers join reservations ;
// amount
// ----------
// 110
// sqlite> select count(customers.id) as amount from customers join reservations on reservations.customers_id = customers.id;
// Error: no such column: reservations.customers_id
// sqlite> select count(customers.id) as amount from customers join reservations on reservations.customer_id = customers.id;
// amount
// ----------
// 11
// sqlite>
// select customers.surname, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount >=2;
// C:\Users\Moradi\Desktop\Projects\cyf-hotel-db\database (master -> origin)
// λ sqlite3 mydatabase.sqlite
// -- Loading resources from C:\Users\Moradi/.sqliterc
// SQLite version 3.22.0 2018-01-22 18:45:57
// Enter ".help" for usage hints.
// sqlite> select * from customers;
// id          title       firstname   surname     email
// ----------  ----------  ----------  ----------  ----------------
// 1           Mrs         Danial      Trump       Donald@gmail.com
// 2           Mr          Mohsen      Moradi      mohsen000069@gma
// 3           Mrs         Nona        Karimi      Nonakarimi@gmail
// 4           Mrs         Mona        Azimi       Monaazimi@gmail.
// 5           Mr          Miran       Ahmadi      Miranahmadi@gmai
// 6           Mr          Mohsen      Moradi      Mohsenmoradi@gma
// 7           Mr          Kash        Akarimi     Kashkarimi@gmail
// 8           Mrs         Lola        siran       lolasiran@gmail.
// 9           Mr          Ashkan      karim       Ashkankarim@gmai
// 10          Mr          Serva       rashid      sevarshid@gmail.
// sqlite> select * from reservation;
// Error: no such table: reservation
// sqlite> select * from reservations;
// id          customer_id  room_id     check_in_date  check_out_date  price
// ----------  -----------  ----------  -------------  --------------  ----------
// 1           1            34          2017-01-01     2017-01-08      105
// 2           2            65          2014-02-02     2015-11-11      375
// 3           3            374         2017-05-01     2018-04-08      205
// 4           2            625         2016-02-02     2018-11-11      275
// 5           5            348         2017-01-01     2017-11-08      500
// 6           6            658         2010-12-10     2015-11-11      200
// 7           7            654         2010-12-01     2015-11-11      300
// 8           8            656         2010-12-22     2015-11-11      305
// 9           9            659         2010-12-13     2015-11-11      175
// 10          10           158         2011-11-11     2015-11-11      275
// 11          2            625         2018-11-12     2018-12-11      275
// sqlite> select customrs_id, * from reservations join customers group by customre_id;
// Error: no such column: customrs_id
// sqlite> select customr_id, * from reservations join customers group by customre_id;
// Error: no such column: customr_id
// sqlite> select customer_id, * from reservations join customers group by customre_id;
// Error: no such column: customre_id
// sqlite> select customer_id, * from reservations join customers group by customer_id;
// customer_id  id          customer_id  room_id     check_in_date  check_out_date  price       id          title       firstname   surname     email
// -----------  ----------  -----------  ----------  -------------  --------------  ----------  ----------  ----------  ----------  ----------  -------------------
// 1            1           1            34          2017-01-01     2017-01-08      105         10          Mr          Serva       rashid      sevarshid@gmail.com
// 2            11          2            625         2018-11-12     2018-12-11      275         10          Mr          Serva       rashid      sevarshid@gmail.com
// 3            3           3            374         2017-05-01     2018-04-08      205         10          Mr          Serva       rashid      sevarshid@gmail.com
// 5            5           5            348         2017-01-01     2017-11-08      500         10          Mr          Serva       rashid      sevarshid@gmail.com
// 6            6           6            658         2010-12-10     2015-11-11      200         10          Mr          Serva       rashid      sevarshid@gmail.com
// 7            7           7            654         2010-12-01     2015-11-11      300         10          Mr          Serva       rashid      sevarshid@gmail.com
// 8            8           8            656         2010-12-22     2015-11-11      305         10          Mr          Serva       rashid      sevarshid@gmail.com
// 9            9           9            659         2010-12-13     2015-11-11      175         10          Mr          Serva       rashid      sevarshid@gmail.com
// 10           10          10           158         2011-11-11     2015-11-11      275         10          Mr          Serva       rashid      sevarshid@gmail.com
// sqlite> select customer_id, count(*) from reservations join customers group by customer_id;
// customer_id  count(*)
// -----------  ----------
// 1            10
// 2            30
// 3            10
// 5            10
// 6            10
// 7            10
// 8            10
// 9            10
// 10           10
// sqlite> select customer_id,*, count(*) from reservations join customers group by customer_id;
// customer_id  id          customer_id  room_id     check_in_date  check_out_date  price       id          title       firstname   surname     email                count(*)
// -----------  ----------  -----------  ----------  -------------  --------------  ----------  ----------  ----------  ----------  ----------  -------------------  ----------
// 1            1           1            34          2017-01-01     2017-01-08      105         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 2            11          2            625         2018-11-12     2018-12-11      275         10          Mr          Serva       rashid      sevarshid@gmail.com  30
// 3            3           3            374         2017-05-01     2018-04-08      205         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 5            5           5            348         2017-01-01     2017-11-08      500         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 6            6           6            658         2010-12-10     2015-11-11      200         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 7            7           7            654         2010-12-01     2015-11-11      300         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 8            8           8            656         2010-12-22     2015-11-11      305         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 9            9           9            659         2010-12-13     2015-11-11      175         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// 10           10          10           158         2011-11-11     2015-11-11      275         10          Mr          Serva       rashid      sevarshid@gmail.com  10
// sqlite> select customers.surname, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount >=2;
// surname     amount
// ----------  ----------
// Moradi      3
// sqlite> select customers.surname, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount;
// surname     amount
// ----------  ----------
// Trump       1
// Moradi      3
// Karimi      1
// Ahmadi      1
// Moradi      1
// Akarimi     1
// siran       1
// karim       1
// rashid      1
// sqlite> select customers, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount;
// Error: no such column: customers
// sqlite> select customers.surname,customers.firstname, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount;
// surname     firstname   amount
// ----------  ----------  ----------
// Trump       Danial      1
// Moradi      Mohsen      3
// Karimi      Nona        1
// Ahmadi      Miran       1
// Moradi      Mohsen      1
// Akarimi     Kash        1
// siran       Lola        1
// karim       Ashkan      1
// rashid      Serva       1
// sqlite> select rooms.room_type_id, rooms.sea_view, count(rooms.id) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// sqlite> select rooms.room_type_id, rooms.sea_view, count(reservations.room_d) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// Error: no such column: reservations.room_d
// sqlite> select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// sqlite> select * from rooms;
// id          room_type_id  sea_view
// ----------  ------------  ----------
// 1           1             1
// 2           2             0
// 3           1             0
// 4           2             0
// 5           1             1
// 6           2             1
// 7           1             0
// 8           2             1
// 9           3             0
// 10          1             0
// 11          2             1
// sqlite> select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms join reservations on rooms.id = reservations.room_id group by rooms.id having amount;
// sqlite> select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms join reservations on reservations.room_id = rooms.id group by rooms.id having amount;
// sqlite> select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms;
// Error: no such column: reservations.room_id
// sqlite> select rooms.room_type_id, rooms.sea_view from rooms;
// room_type_id  sea_view
// ------------  ----------
// 1             1
// 2             0
// 1             0
// 2             0
// 1             1
// 2             1
// 1             0
// 2             1
// 3             0
// 1             0
// 2             1
// sqlite>


// select customrs_id, * from reservations join customers group by customre_id;
// select customr_id, * from reservations join customers group by customre_id;
// select customer_id, * from reservations join customers group by customre_id;
// select customer_id, * from reservations join customers group by customer_id;
// select customer_id, count(*) from reservations join customers group by customer_id;
// select customer_id,*, count(*) from reservations join customers group by customer_id;
// select customers, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount;
// select customers.surname,customers.firstname, count(reservations.id) as amount from customers join reservations on reservations.customer_id = customers.id group by customers.id having amount;
// select rooms.room_type_id, rooms.sea_view, count(rooms.id) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// select rooms.room_type_id, rooms.sea_view, count(reservations.room_d) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from reservations join rooms on rooms.id = reservations.room_id group by rooms.id having amount;
// select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms join reservations on rooms.id = reservations.room_id group by rooms.id having amount;
// select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms;
// select rooms.room_type_id, rooms.sea_view from rooms;
// select rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from rooms join reservations on reservations.room_id = rooms.id group by rooms.id having amount;
// select room_types.type_name, rooms.room_type_id, rooms.sea_view, count(reservations.room_id) as amount from room_types join rooms join reservations on reservations.room_id = rooms.id group by rooms.id having amount;
// select room_types.type_name, rooms.room_type_id, rooms.sea_view, count(room_type_id) as amount from room_types join rooms join reservations on reservations.room_id = rooms.room_type_id group by rooms.room_type_id having amount;
// select room_types.type_name, rooms.room_type_id, rooms.sea_view, count(room_type_id) as amount from room_types join rooms join reservations on room_types.id = rooms.room_type_id group by rooms.room_type_id having amount;
// select room_types.type_name, rooms.room_type_id, rooms.sea_view, count(room_types.id) as amount from room_types join rooms join reservations on room_types.id = rooms.room_type_id group by rooms.room_type_id having amount;
// select customers.id, customers.title, customers.firstname, customers.surname, rooms.id, rooms.room_type_id,room_types.type_name, rooms.sea_view, reservations.price, julianday(check_out_date) - julianday(check_in_date) as duration from customers join reservations join rooms join room_types where customers.id = reservations.customer_id and rooms.id = reservations.room_id and room_types.id = rooms.room_type_id group by duration order by duration;
// select customer_id, customers.title, customers.firstname,customers.surname ,count(*) as amount from reservations join customers where customers.id =reservations.customer_id group by customers.id;


