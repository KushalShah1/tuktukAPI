var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: 'prod',
});


var { uuid } = require('uuidv4');
var failConDB = {
    "statusCode": 500,
    "headers": {
        "my_header": "my_value"
    },
    "body": "Failed Connection to Database",
    "isBase64Encoded": false
};

var failQuery = {
    "statusCode": 500,
    "headers": {
        "my_header": "my_value"
    },
    "body": "Failed Query",
    "isBase64Encoded": false
};



exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    let response = {};
    let status = 200;
    if (event.resource === '/clickonrides' && event.httpMethod === 'GET') {
        let ride_id = event.queryStringParameters.ride_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(null, failConDB)
            }
            // Use the connection
            connection.query('SELECT * FROM prod.Rides INNER JOIN Users ON Rides.driver_id=Users.user_id where ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(null, failQuery)
                }
                response = {
                    "statusCode": 200,
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

    //ride_id= 4& datetime='2020-01-01T10:10:10.000Z'&destination= 'HEB'& from='West Campus'& destination_lat= 10.12&destination_long= 12.13&from_lat=99.99999999&from_long= 2.4444&seats= 4 &users_joined= 2&description='Test Ride'&traction= 0&price= 3.52&safety_features= null &driver_id= 2332 &car='corolla' 
    else if (event.resource === '/addride' && event.httpMethod === 'POST') {
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
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('INSERT INTO `prod`.`Rides` (`ride_id`,' + columns + ') VALUES ("' + uuid() + '",' + value + ')', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
                }

                response = {
                    "statusCode": 200,
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
    else if (event.resource === '/deleteride' && event.httpMethod === 'DELETE') {
        let ride_id = event.queryStringParameters.ride_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('DELETE from prod.Rides where ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
                }
                response = {
                    "statusCode": 200,
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
    else if (event.resource === '/deleteuserfromride' && event.httpMethod === 'DELETE') {
        let ride_id = event.queryStringParameters.ride_id;
        let userToDelete = event.queryStringParameters.user_id;
        let usersAlreadyThere = "";
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(err, failConDB);
            }
            connection.query('SELECT users_joined FROM prod.Rides WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
                }
                usersAlreadyThere = results[0].users_joined;
                let users = usersAlreadyThere.split(',');
                for (var i = 0; i < users.length; i++) {
                    if (users[i] === userToDelete) {
                        users.splice(i, 1);
                    }
                }
                usersAlreadyThere = users.join();

                // Use the connection
                connection.query('UPDATE prod.Rides SET users_joined="' + usersAlreadyThere + '" WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();
                    // Handle error after the release.
                    if (error) {
                        callback(null, {
                            "statusCode": 500,
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
        });
    }
    else if (event.resource === '/getuserrides' && event.httpMethod === 'GET') {
        let driver_id = event.queryStringParameters.driver_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('SELECT * from prod.Rides WHERE driver_id="' + driver_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/joinride' && event.httpMethod === 'PUT') {
        let ride_id = event.queryStringParameters.ride_id;
        let userToAdd = event.queryStringParameters.user_id;
        let usersAlreadyThere = "";
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(null, failConDB);
            }
            connection.query('SELECT users_joined FROM prod.Rides WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                // Handle error after the release.
                if (error) {
                    callback(null, failQuery)
                }
                usersAlreadyThere = results[0].users_joined;
                if (!usersAlreadyThere) {
                    usersAlreadyThere = userToAdd;
                }
                else {
                    usersAlreadyThere += ',' + userToAdd;
                }

                // Use the connection
                connection.query('UPDATE prod.Rides SET users_joined="' + usersAlreadyThere + '" WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();
                    // Handle error after the release.
                    if (error) {
                        callback(error, failQuery);
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
        });
    }
    else if (event.resource === '/modifytrip' && event.httpMethod === 'PUT') {
        let queryParams = "";
        let ride_id = 0;
        for (var x in event.queryStringParameters) {
            if (x === "ride_id") {
                ride_id = event.queryStringParameters[x];
            }
            else {
                queryParams += x + "=" + event.queryStringParameters[x] + ",";
            }
        }
        queryParams = queryParams.substring(0, queryParams.length - 1)

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('UPDATE prod.Rides SET ' + queryParams + 'WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/ridelistsearch' && event.httpMethod === 'GET') {
        let destination = event.queryStringParameters.destination;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('SELECT * FROM prod.Rides WHERE levenshtein_ratio("' + destination + '", `destination`) BETWEEN 75 AND 100', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/ridelistsearch/trendingrides' && event.httpMethod === 'GET') {
        let num = event.queryStringParameters.num;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('SELECT * FROM prod.Rides ORDER BY traction DESC LIMIT ' + num, function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/addriderequest' && event.httpMethod === 'POST') {
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
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('INSERT INTO `prod`.`RideRequests` (`ride_id`,' + columns + ') VALUES ("' + uuid() + '",' + value + ')', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/deleteriderequest' && event.httpMethod === 'DELETE') {
        let ride_id = event.queryStringParameters.ride_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('DELETE from prod.RideRequests where ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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
    else if (event.resource === '/modifyriderequest' && event.httpMethod === 'PUT') {
        let queryParams = "";
        let ride_id = 0;
        for (var x in event.queryStringParameters) {
            if (x === "ride_id") {
                ride_id = event.queryStringParameters[x];
            }
            else {
                queryParams += x + "=" + event.queryStringParameters[x] + ",";
            }
        }
        queryParams = queryParams.substring(0, queryParams.length - 1)

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
                callback(err, failConDB);
            }
            // Use the connection
            connection.query('UPDATE prod.RideRequests SET ' + queryParams + 'WHERE ride_id="' + ride_id + '"', function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) {
                    callback(error, failQuery);
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

