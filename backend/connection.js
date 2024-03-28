const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_details",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting to MySql");
    return;
  }
  console.log("connected to mysql ");
});

module.exports = connection;
