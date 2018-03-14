create table invoices (
    id                  integer primary key,
    reservation_id      integer not null,
    total               number,
    surcharges          number,
    invoice_date_time   datetime not null,
    paid                boolean default false,
    foreign key(reservation_id) references reservations(id)
);

insert into invoices (reservation_id, total, invoice_date_time, paid) values (24, 3444.50, '2017-01-01', 1);
insert into invoices (reservation_id, total, invoice_date_time, paid) values (25, 344.50, '2017-02-01', 1);
insert into invoices (reservation_id, total, invoice_date_time)       values (35, 3445.50, '2017-01-02');
insert into invoices (reservation_id, total, invoice_date_time, paid) values (24, 3444.50, '2017-01-01', 1);
insert into invoices (reservation_id, total, invoice_date_time, paid) values (28, 153.50, '2017-08-01', 1);
insert into invoices (reservation_id, total, invoice_date_time, paid) values (24, 354.50, '2015-01-01', 1);
insert into invoices (reservation_id, total, invoice_date_time)       values (444, 250.50, '2017-01-02');
insert into invoices (reservation_id, total, invoice_date_time)       values (250, 431.50, '2017-01-03');
insert into invoices (reservation_id, total, invoice_date_time, paid) values (574, 300.50, '2017-01-04', 1);
insert into invoices (reservation_id, total, invoice_date_time, paid) values (546, 284.35, '2017-01-04', 1);

create table reservations (
    id             integer primary key,
    customer_id    integer not null,
    room_id        integer not null,
    check_in_date  datetime not null,
    check_out_date datetime,
    price          integer,
    foreign key(customer_id) references customers(id),
    foreign key(room_id) references rooms(id)
);

insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (1, 2, '2017-01-01','2017-01-08' ,105);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (2, 5, '2014-02-02', '2015-11-11',375);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (3, 4, '2017-05-01','2018-04-08' ,205);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (2, 1, '2016-02-02','2018-11-11',275);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (5, 2, '2017-01-01','2017-11-08' ,500);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (6, 2, '2010-12-10', '2015-11-11',200);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (7, 5, '2010-12-01', '2015-11-11',300);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (8, 3, '2010-12-22', '2015-11-11',305);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (9, 8, '2010-12-13', '2015-11-11',175);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (10, 4, '2011-11-11', '2015-11-11',275);
insert into reservations (customer_id, room_id, check_in_date, check_out_date, price) values (2, 2, '2018-11-12','2018-12-11',275);


create table customers (
    id              integer primary key,
    title           varchar,
    firstname       varchar,
    surname         varchar,
    email           varchar
);

insert into customers (title, firstname, surname, email) values ('Mr', 'Donald', 'Trump', 'DonaldTrump@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Mohsen', 'Moradi', 'mohsen000069@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mrs', 'Nona', 'Karimi', 'Nonakarimi@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mrs', 'Mona', 'Azimi', 'Monaazimi@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Miran', 'Ahmadi', 'Miranahmadi@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Mohsen', 'Moradi', 'Mohsenmoradi@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Kash', 'Akarimi', 'Kashkarimi@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mrs', 'Lola', 'siran', 'lolasiran@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Ashkan', 'karim', 'Ashkankarim@gmail.com');
insert into customers (title, firstname, surname, email) values ('Mr', 'Serva', 'rashid', 'sevarshid@gmail.com');

create table rooms (
    id                  integer primary key,
    room_type_id        integer not null,
    sea_view            integer,
    foreign key(room_type_id) references room_types(id)
);

insert into rooms (room_type_id, sea_view) values (1, 1);
insert into rooms (room_type_id, sea_view) values (2, 0);
insert into rooms (room_type_id, sea_view) values (1, 0);
insert into rooms (room_type_id, sea_view) values (2, 0);
insert into rooms (room_type_id, sea_view) values (1, 1);
insert into rooms (room_type_id, sea_view) values (2, 1);
insert into rooms (room_type_id, sea_view) values (1, 0);
insert into rooms (room_type_id, sea_view) values (2, 1);
insert into rooms (room_type_id, sea_view) values (3, 0);
insert into rooms (room_type_id, sea_view) values (1, 0);
insert into rooms (room_type_id, sea_view) values (2, 1);

create table reviews (
    id                  integer primary key,
    customer_id         integer,
    room_type_id        integer,
    comment             integer,
    review_date         datetime not null,
    foreign key(customer_id) references customers(id),
    foreign key(room_type_id) references room_types(id)
);

insert into reviews (comment, review_date) values ('ok','2018-04-08');
insert into reviews (comment, review_date) values ('ok','2018-04-08');
insert into reviews (comment, review_date) values ('ok','2018-04-08');
insert into reviews (comment, review_date) values ('ok','2018-04-08');


create table room_types (
    id                  integer primary key,
    type_name           varchar,
    original_price      integer,
    current_price       integer
);

insert into room_types(type_name, original_price, current_price) values ('Superior Room', 60, 55);
insert into room_types(type_name, original_price, current_price) values ('Executive Room', 59, 65);
insert into room_types(type_name, original_price, current_price) values ('Pacific Room', 85, 80);

