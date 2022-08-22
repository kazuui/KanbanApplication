require('dotenv/config');
const db = require('../config/db.js');
const Groups = require("../models/GroupModel.js");

//Get all groups
exports.getGroups = (req, res, next) => {
    let sql = `SELECT * FROM kanban_web_app.group`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
};

//Create group
exports.createGroup = (req, res, next) => {
    let sql = `INSERT INTO "group" (group_name) VALUES ('heehee')`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
};