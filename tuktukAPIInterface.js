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
// Template syntax follows url-template https://www.npmjs.com/package/url-template
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

// apigClient.invokeApi(pathParams, pathTemplate+'/ridelistsearch', method, additionalParams, body)
//     .then(function(result){
//         console.log(result.data);
//         //This is where you would put a success callback
//     }).catch( function(result){
//         //This is where you would put an error callback
//         console.log(result);
//     });

//ride_id= 4& datetime='2020-01-01T10:10:10.000Z'&destination= 'HEB'& from='West Campus'& destination_lat= 10.12&destination_long= 12.13&from_lat=99.99999999&from_long= 2.4444&seats= 4 &users_joined= 2&description='Test Ride'&traction= 0&price= 3.52&safety_features= null &driver_id= 2332 &car='corolla' 
async function addRide(_datetime, _destination, _from, _destination_lat, _destination_long, _from_lat, _from_long, _seats, _description, _traction, _price, _safety_features, _driver_id, _car) {
    additionalParams = {
        queryParams: {
            datetime: _datetime,
            destination: _destination,
            destination_lat: _destination_lat,
            destination_long: _destination_long,
            from: _from,
            from_lat: _from_lat,
            from_long: _from_long,
            seats: _seats,
            description: _description,
            traction: _traction,
            price: _price,
            safety_features: _safety_features,
            driver_id: _driver_id,
            car: _car
        }
    }

    return await apigClient.invokeApi(pathParams, pathTemplate + '/addride', 'POST', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function getRideInfo(_ride_id) {
    additionalParams = {
        queryParams: {
            ride_id: _ride_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/clickonrides', 'GET', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function deleteRide(_ride_id) {
    additionalParams = {
        queryParams: {
            ride_id: _ride_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/deleteride', 'DELETE', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function getUserRides(_driver_id) {
    additionalParams = {
        queryParams: {
            driver_id: _driver_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/getuserrides', 'GET', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function modifyRide(_ride_id, _datetime, _destination, _from, _destination_lat, _destination_long, _from_lat, _from_long, _seats, _users_joined, _description, _traction, _price, _safety_features, _driver_id, _car) {
    additionalParams = {
        queryParams: {
            ride_id: _ride_id,
            datetime: _datetime,
            destination: _destination,
            destination_lat: _destination_lat,
            destination_long: _destination_long,
            from: _from,
            from_lat: _from_lat,
            from_long: _from_long,
            seats: _seats,
            users_joined: _users_joined,
            description: _description,
            traction: _traction,
            price: _price,
            safety_features: _safety_features,
            driver_id: _driver_id,
            car: _car
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/modifyride', 'PUT', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function rideListSearch(_destination) {
    additionalParams = {
        queryParams: {
            destination: _destination
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/ridelistsearch', 'GET', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function trendingRideListSearch(number) {
    additionalParams = {
        queryParams: {
            num: number
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/ridelistsearch/trendingrides', 'GET', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function joinRide(_ride_id, _user_id) {
    additionalParams = {
        queryParams: {
            ride_id: _ride_id,
            user_id: _user_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/joinride', 'PUT', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function deleteUserFromRide(_ride_id, _user_id) {
    additionalParams = {
        queryParams: {
            ride_id: _ride_id,
            user_id: _user_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/deleteuserfromride', 'DELETE', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function addRideRequest(_datetime, _destination, _from, _destination_lat, _destination_long, _from_lat, _from_long, _description, _price) {
    additionalParams = {
        queryParams: {
            datetime: _datetime,
            destination: _destination,
            destination_lat: _destination_lat,
            destination_long: _destination_long,
            from: _from,
            from_lat: _from_lat,
            from_long: _from_long,
            description: _description,
            price:_price
        }
    }

    return await apigClient.invokeApi(pathParams, pathTemplate + '/addriderequest', 'POST', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function addUser(user_sub, profile_pic_path, _gender){
    additionalParams = {
        queryParams: {
            user_id:user_sub,
            profile_pic:profile_pic_path,
            gender:_gender,
            rating:0.0
        }
    }

    return await apigClient.invokeApi(pathParams, pathTemplate + '/adduser', 'POST', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function modifyUser(user_sub, profile_pic_path, _gender,_rating){
    additionalParams = {
        queryParams: {
            user_id:user_sub,
            profile_pic:profile_pic_path,
            gender:_gender,
            rating:_rating
        }
    }

    return await apigClient.invokeApi(pathParams, pathTemplate + '/modifyuserinfo', 'PUT', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function getUserInfo(user_sub){
    additionalParams = {
        queryParams: {
            user_id:user_sub
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/getuserinfo', 'GET', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function deleteUser(user_sub){
    additionalParams = {
        queryParams: {
            user_id:user_sub
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/deleteuser', 'DELETE', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function deleteRideRequest(_ride_id){
    additionalParams = {
        queryParams: {
            ride_id: _ride_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate + '/deleteriderequest', 'DELETE', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

async function modifyRideRequest(_datetime, _destination, _from, _destination_lat, _destination_long, _from_lat, _from_long, _description, _price) {
    additionalParams = {
        queryParams: {
            datetime: _datetime,
            destination: _destination,
            destination_lat: _destination_lat,
            destination_long: _destination_long,
            from: _from,
            from_lat: _from_lat,
            from_long: _from_long,
            description: _description,
            price:_price
        }
    }

    return await apigClient.invokeApi(pathParams, pathTemplate + '/modifyriderequest', 'PUT', additionalParams, body)
        .then(function (result) {
            return (result.data);
            //This is where you would put a success callback
        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

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
                .then(res => {return "https://tuktukpics.s3.amazonaws.com/"+_user_id+path.extname(localImage)})
                .catch(err => {return "Upload Failed"});

        }).catch(function (result) {
            //This is where you would put an error callback
            return (result);
        });
}

// async function getURLforProPic(_user_id,localImagePath){
//     additionalParams = {
//         queryParams: {
//             image_name: _user_id+path.extname(localImagePath)
//         }
//     }
//     return await apigClient.invokeApi(pathParams, pathTemplate + '/geturlforpic', 'GET', additionalParams, body)
//         .then(function (result) {
//             return (result.data);
//             //This is where you would put a success callback
//         }).catch(function (result) {
//             //This is where you would put an error callback
//             return (result);
//         });
// }

//rideListSearch('Pcvhhbjbjb').then(data=>{console.log(data)});

uploadProfilePicture('f41d39cc-4c52-4ad6-9b48-0ce716e5246a',"C:\\Users\\kusha\\Pictures\\download.jfif").then(data=>{console.log(data)});

//trendingRideListSearch(2).then(data=>{console.log(data)});
module.exports = {
    addRide,
    getRideInfo,
    deleteRide,
    getUserRides,
    modifyRide,
    rideListSearch,
    joinRide,
    deleteUserFromRide,
    addRideRequest,
    addUser,
    getUserInfo,
    modifyUser,
    deleteUser,
    trendingRideListSearch,
    deleteRideRequest,
    modifyRideRequest,
    uploadProfilePicture
}