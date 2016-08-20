/**
 * Created by divesh212 on 18/8/16.
 */
'use strict';

const mysql = require('mysql');

let connection = {};
const createConnection = function () {
    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'divesh',
            // password : 'secret',
            database : 'project1'
        }
    );
    return connection;
};

module.exports = {

    adduser: function ( user, cb ) {
        const conn = createConnection();
        conn.connect();
        const queryString = "INSERT INTO AllUsers VALUES (" +
            user.userid + ", " +
            "'" + user.username + "' );";
        conn.query(queryString, function (err, result) {
            cb(result);
        });
        conn.end();
    }
}
