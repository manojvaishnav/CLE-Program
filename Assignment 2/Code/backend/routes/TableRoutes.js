const express = require('express');
const { addTable, getTable, bookTable, cancelTable } = require('../controller/TableController');
const {verifyToken} = require('../config/CreateToken')

const router = express.Router();

router.post("/table", addTable);
router.get("/tables", getTable);
router.post("/book-table", verifyToken,bookTable);
router.post("/cancel-table", verifyToken,cancelTable);

module.exports = router;