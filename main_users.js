var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
});
var { uuid } = require('uuidv4');

exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    let response = {};
    let status = 200;

    if (event.resource === '/adduser' && event.httpMethod === 'POST') {
        let value = "";
        let columns = "";
        for (var x in event.queryStringParameters) {
            columns += '`' + x + '`';
            columns += ",";
            value += '"' + event.queryStringParameters[x] + '"';
            value += ",";
        }
        value = value.substring(0, value.length - 1);
        columns = columns.substring(0, columns.length - 1);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(null, {
                    "statusCode": 401,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": "Could Not Connect to Database",
                    "isBase64Encoded": false
                })
            }
            // Use the connection
            connection.query('INSERT INTO `prod`.`Users` (' + columns + ') VALUES (' + value + ')', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(null, {
                        "statusCode": 401,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(error),
                        "isBase64Encoded": false
                    })
                }
                else status = 200;

                response = {
                    "statusCode": status,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(results),
                    "isBase64Encoded": false
                };
                console.log("response: " + JSON.stringify(response))
                callback(null, response)
            });
        });
    }
    else if (event.resource === '/modifyuserinfo' && event.httpMethod === 'PUT') {
        let queryParams = "";
        let user_id = "";
        for (var x in event.queryStringParameters) {
            if (x === "user_id") {
                user_id = event.queryStringParameters[x];
            }
            else {
                queryParams += x + "=" + event.queryStringParameters[x] + ",";
            }
        }
        queryParams = queryParams.substring(0, queryParams.length - 1)

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(null, {
                    "statusCode": 401,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": "Could Not Connect to Database",
                    "isBase64Encoded": false
                })
            }
            // Use the connection
            connection.query('UPDATE prod.Rides SET ' + queryParams + 'WHERE user_id="' + user_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(null, {
                        "statusCode": 401,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(error),
                        "isBase64Encoded": false
                    })
                }
                else status = 200;

                response = {
                    "statusCode": status,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(results),
                    "isBase64Encoded": false
                };
                console.log("response: " + JSON.stringify(response))
                callback(null, response)
            });
        });
    }
    else if (event.resource === '/getuserinfo' && event.httpMethod === 'GET') {
        let user_id = event.queryStringParameters.user_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('SELECT * from prod.Rides where user_id="' + user_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) status = 2;
                else status = 200;
                response = {
                    "statusCode": status,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(results),
                    "isBase64Encoded": false
                };
                console.log("response: " + JSON.stringify(response))
                callback(null, response)
            });
        });
    }
    else if (event.resource === '/deleteuser' && event.httpMethod === 'DELETE') {
        let user_id = event.queryStringParameters.user_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('DELETE from prod.Rides where user_id="' + user_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) status = 2;
                else status = 200;
                response = {
                    "statusCode": status,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(results),
                    "isBase64Encoded": false
                };
                console.log("response: " + JSON.stringify(response))
                callback(null, response)
            });
        });
    }
    else {
        response = {
            "statusCode": 404,
            "headers": {
                "my_header": "my_value"
            },
            "body": "Invalid API Call",
            "isBase64Encoded": false
        };
        callback(null, response);
    }

}

