'use strict';
/* Data Access Object (DAO) module for accessing creators */

const db = require('./db');
const bcrypt = require('bcrypt');

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from creators where email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err); // DB error
            else if (row === undefined)
                resolve(false); // user not found
            else {
                bcrypt.compare(password, row.hash).then(result => {
                    if (result) // password matches
                        resolve({ id: row.id, email: row.email, name: row.name });
                    else
                        resolve(false); // password not matching
                })
            }
        });
    });
};


exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM creators WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'User not found.' });
            else {
                const user = { id: row.id, username: row.email, name: row.name }
                resolve(user);
            }
        });
    });
};