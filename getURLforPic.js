const AWS = require("aws-sdk");
const config = require("./config.json");
AWS.config.update({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretCode
});
const s3 = new AWS.S3({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretCode,
    useAccelerateEndpoint: true
});


exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    let response = {};
    let status = 200;
    const params = {
        Bucket: "tuktukpics",
        Key: event.queryStringParameters.image_name,
        Expires: 60 * 60, // expiry time
        //ContentType:'image'
    };

    s3.getSignedUrl("getObject", params, function (err, url) {
        if (err) {
            console.log("Error getting presigned url from AWS S3");
            response = {
                "statusCode": 504,
                "headers": {
                    "my_header": "my_value"
                },
                "body": "Error getting URL" + JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        } else {
            response = {
                "statusCode": status,
                "headers": {
                    "my_header": "my_value"
                },
                "body": url,
                "isBase64Encoded": false
            };
            console.log("response: " + JSON.stringify(response))
            callback(null, response);
        }
    });


}
