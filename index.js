var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
});
exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    let response = {};
    let status = 200;
    if (event.resource === '/clickonrides' && event.httpMethod === 'GET') {
        let rideId = event.queryStringParameters.rideId;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('SELECT * from data.Rides where ride_id=' + rideId, function (error, results, fields) {
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
                    "body": JSON.stringify(results[0]),
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
            value += event.queryStringParameters[x];
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
            connection.query('INSERT INTO `data`.`Rides` (' + columns + ') VALUES (' + value + ')', function (error, results, fields) {
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
    else if (event.resource === '/deleteride' && event.httpMethod === 'DELETE') {
        let rideId = event.queryStringParameters.rideId;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('DELETE from data.Rides where ride_id=' + rideId, function (error, results, fields) {
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
    else if (event.resource === '/deleteuserfromride' && event.httpMethod === 'DELETE') {
    }
    else if (event.resource === '/getuserinfo' && event.httpMethod === 'GET') {
    }
    else if (event.resource === '/getuserrides' && event.httpMethod === 'GET') {
        let driverId = event.queryStringParameters.driverId;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('SELECT * from data.Rides WHERE driver_id='+ driverId, function (error, results, fields) {
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
    else if (event.resource === '/joinride' && event.httpMethod === 'PUT') {
    }
    else if (event.resource === '/modifytrip' && event.httpMethod === 'PUT') {
        let queryParams="";
        let ride_id=0;
        for (var x in event.queryStringParameters) {
            if(x==="ride_id"){
                ride_id=event.queryStringParameters[x];
            }
            else{
                queryParams+=x+"="+event.queryStringParameters[x]+",";
            }
        }
        queryParams=queryParams.substring(0,queryParams.length-1)
        
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
            connection.query('UPDATE data.Rides SET '+queryParams+'WHERE ride_id='+ride_id, function (error, results, fields) {
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
    }
    else if (event.resource === '/ridelistsearch' && event.httpMethod === 'GET') {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("failed connection");
            }
            // Use the connection
            connection.query('SELECT * from data.Rides', function (error, results, fields) {
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
    else if (event.resource === '/ridelistsearch/trendingrides' && event.httpMethod === 'GET') {
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
        callback(null,response);
    }

}

