"use strict";

const sqlite = require('sqlite3');

const db = new sqlite.Database('memes.sqlite', (err) => {
    if (err) throw err;
});

module.exports = db;