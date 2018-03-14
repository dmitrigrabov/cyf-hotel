const express = require("express");
const router = express.Router();


const customers = require("./customers");
const reservations = require("./reservations");
const Customersjoinreservation = require("./Customersjoinreservation");
router.use("/", Customersjoinreservation);
router.use("/", reservations);
router.use("/", customers);


module.exports = router;
