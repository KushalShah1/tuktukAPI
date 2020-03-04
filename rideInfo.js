var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: 'prod',
});
const AWS = require('aws-sdk');
AWS.config.update({
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    },
    region: 'us-east-1'
});
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' })


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
    let ride_id = event.queryStringParameters.ride_id;

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, failConDB);
        }
        // Use the connection
        connection.query('SELECT * FROM prod.Rides INNER JOIN Users ON Rides.driver_id=Users.user_id where ride_id="' + ride_id + '"', function (error, results, fields) {
            // And done with the connection.
            connection.release();
            // Handle error after the release.
            if (error) {
                callback(error, failQuery);
            }
            else {
                if (results.length > 0) {
                    const getUser= async()=>{
                        await asyncForEach(results, async (res)=>{
                            await cognito.adminGetUser({
                                UserPoolId: "us-east-1_IVvtM8Ze2",
                                Username: res.driver_id,
                            }).promise().then(user => {
                                user.UserAttributes.forEach(function (val) {
                                    res[val.Name] = val.Value;
                                })
                            })
                        })
                        response = {
                            "statusCode": status,
                            "headers": {
                                "my_header": "my_value"
                            },
                            "body": JSON.stringify(results[0]),
                            "isBase64Encoded": false
                        };
                        console.log("response: " + JSON.stringify(response))
                        callback(null, response);
                    }

                    getUser();
                }
                else {
                    response = {
                        "statusCode": status,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(results),
                        "isBase64Encoded": false
                    };
                    console.log("response: " + JSON.stringify(response))
                    callback(null, response);
                }
            }
        });
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index]);
    }
  }