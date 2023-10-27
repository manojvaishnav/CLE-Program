const table = require('../models/TableModel')

module.exports.addTable = async (req, res) => {
    try {
        const { tableNo } = req.body
        const tableExists = await table.findOne({ tableNo })
        if (tableExists) {
            res.status(400).json({
                message: "Table already exists"
            })
        }
        const data = new table({
            tableNo
        })
        await data.save().then(async (result) => {
            res.status(200).json({
                message: "Table Added Successfully",
                result
            });
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports.getTable = async (req, res) => {
    try {
        const result = await table.find()
        res.status(200).json({
            result
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports.cancelTable = async (req, res) => {
    try {
        const { tableNo } = req.body;

        const existingTable = await table.findOne({ tableNo });

        if (!existingTable) {
            res.status(404).json({ message: "Table not found" });
        }

        if (existingTable.status !== "Booked") {
            res.status(400).json({ message: "Table is not booked" });
        }

        existingTable.status = "Available";

        await existingTable.save();

        res.status(200).json({ message: "Table booking successfully canceled" })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports.bookTable = async (req, res) => {
    try {
        const { tableNo } = req.body
        const tableExists = await table.findOne({ tableNo })
        if (!tableExists) {
            res.status(400).json({
                message: "Table not exxists"
            })
        }
        if (tableExists.status === "Booked") {
            res.status(400).json({ message: "Table is already booked" });
        }

        tableExists.status = "Booked";

        await tableExists.save();

        res.status(200).json({ message: "Table successfully booked" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}