"use strict";
const mongoose = require("mongoose");
const {host, port, name} = require('../configs/mongodb.config');

class Database {

    // constructor
    constructor() {
        this.connect();
    }

    // connect to the database
    connect() {
        const connectString = `mongodb://${host}:${port}/${name}`;
        mongoose.connect(connectString).then(() => {
            console.log(`Database connected successfully ${host}:${port}/${name}`);
        }).catch((err) => {
            console.log("Database connection failed");
            console.log(err);
        });
    }

    // static getInstance
    static getInstance() {
       if (!Database.instance){
              Database.instance = new Database();
       }
         return Database.instance;
    }
}

const database = Database.getInstance();

module.exports = database;