var axios = require('axios');
var fs = require('fs');
var FormData = require('form-data');
var path= require('path');
var apigClientFactory = require('aws-api-gateway-client').default;
config = { invokeUrl: 'https://jbhhfznzg4.execute-api.us-east-1.amazonaws.com' }
var apigClient = apigClientFactory.newClient(config);

var pathParams = {
    //This is where path request params go. 
};
var pathTemplate = '/Initial_Development'
var method = 'GET';
var additionalParams = {
    //If there are query parameters or headers that need to be sent with the request you can add them here
    // headers: {
    //     param0: '',
    //     param1: ''
    // },
    // queryParams: {
    //     param0: '',
    //     param1: ''
    // }
};
var body = {
    //This is where you define the body of the request
};

async function uploadProfilePicture(_user_id, localImage) {
    let file = fs.readFileSync(localImage);
    additionalParams = {
        queryParams: {
            user_id: _user_id,
            image_name : _user_id+path.extname(localImage),

        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/getSignedURLfortuktukS3', 'GET', additionalParams, body)
        .then(function (result) {
            const config = {
                headers: {
                    'Content-Type': 'image'
                  }
            };

            let fd = new FormData();
            fd.append("image", file, _user_id);


            return axios.put(result.data, file, config)
                .then(res => {return "Upload Successful"})
                .catch(err => {return "Upload Failed"});

        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

uploadProfilePicture('f41d39cc-4c52-4ad6-9b48-0ce716e5246a',"C:\\Users\\kusha\\Pictures\\corolla.jfif").then(data => { console.log(data) });
