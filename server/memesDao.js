'use strict';
/* Data Access Object (DAO) module for accessing memes */

const db = require('./db');

function Meme(id, title, image, visibility, creator, sentence1 = '', sentence2 = '', sentence3 = '', font, color, copy) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.visibility = visibility;
    this.creator = creator;
    this.sentence1 = sentence1;
    this.sentence2 = sentence2;
    this.sentence3 = sentence3;
    this.font = font;
    this.color = color;
    this.copy = copy;
}

//retrieve all memes
exports.listMemes = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from memes';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const memes = rows.map((m) => new Meme(m.id, m.title, m.image, m.visibility, m.creator, m.sentence1, m.sentence2, m.sentence3, m.font, m.color, m.copy));
            resolve(memes);
        });
    });
}

//retrieve all public memes
exports.listPublicMemes = () => {
    return new Promise((resolve, reject) => {
        let visibility = 'Public';
        const sql = 'select * from memes where visibility = ?';
        db.all(sql, [visibility], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const memes = rows.map((m) => new Meme(m.id, m.title, m.image, m.visibility, m.creator, m.sentence1, m.sentence2, m.sentence3, m.font, m.color, m.copy));
            resolve(memes);
        });
    });
}

//create a new meme
exports.createMeme = (meme) => {
    return new Promise((resolve, reject) => {
        const sql = 'insert into memes(title, image, visibility, creator, sentence1, sentence2, sentence3, font, color, copy) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [meme.title, meme.image, meme.visibility, meme.creator, meme.sentence1, meme.sentence2, meme.sentence3, meme.font, meme.color, meme.copy], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve();
        });
    });
}

//delete meme with a given id
exports.deleteMeme = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM memes WHERE id = ?";
        db.run(sql, [id], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}