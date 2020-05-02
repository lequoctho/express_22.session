const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// book
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = db;