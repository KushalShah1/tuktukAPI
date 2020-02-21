var mysql = require('mysql');
var config = require('./config.json');
var pool  = mysql.createPool({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    //database : config.dbname
  });
pool.getConnection(function(err, connection) {
    if (err){
        console.log("failed connection");
        return null;
    }
  // Use the connection
  connection.query("use data");
  connection.query('SELECT * from Users', function (error, results, fields) {
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) throw error;
    else console.log(results[0].userId);
    process.exit();
  });
});