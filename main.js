var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
});
exports.handler = (event,context,callback) => {
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {

    if (err) {
      console.log("failed connection");
    }
    // Use the connection
    connection.query("use data");
    connection.query('SELECT * from Users', function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      let status=0;
      if (error) status=2;
      else status=200;

      let response = {
        "statusCode": status,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(results[0]),
        "isBase64Encoded": false
      };
      console.log("response: " + JSON.stringify(response))
      callback(null,response)
  });
});
}

