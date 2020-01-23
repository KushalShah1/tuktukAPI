// var http = require('http');

// var options={
//     host:'jbhhfznzg4.execute-api.us-east-1.amazonaws.com',
//     port:80,
//     path:'/Initial_Development/getuserrides',
//     method: 'GET'
// }
// function getJSON(options, cb){
//     http.request(options,function(res){
//         var body='';
//         res.on('data',function(chunk){
//             body+=chunk;
//         });

//         res.on('end',function(chunk){
//             var obj=JSON.parse(body);
//             cb(null,obj);
//         });

//         res.on('error',cb);

//     })
//     .on('error', cb)
//     .end();
// }

// getJSON(options, function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log(result);
// })

var apigClientFactory = require('aws-api-gateway-client').default;
config = {invokeUrl:'https://jbhhfznzg4.execute-api.us-east-1.amazonaws.com'}
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
async function addRide(_ride_id, _datetime, _destination,_from, _destination_lat,_destination_long, _from_lat,_from_long, _seats, _users_joined,_description, _traction, _price, _safety_features,_driver_id, _car ){
    additionalParams={
        queryParams:{
            ride_id:_ride_id,
            datetime:_datetime,
            destination: _destination,
            destination_lat:_destination_lat,
            destination_long:_destination_long,
            from: _from,
            from_lat:_from_lat,
            from_long:_from_long,
            seats:_seats,
            users_joined:_users_joined,
            description:_description,
            traction:_traction,
            price:_price,
            safety_features:_safety_features,
            driver_id:_driver_id,
            car:_car
        }
    }
    
    return await apigClient.invokeApi(pathParams, pathTemplate+'/addride', 'POST', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch( function(result){
        //This is where you would put an error callback
        return(result);
    });
}

async function getRideInfo(_ride_id){
    additionalParams={
        queryParams:{
            ride_id:_ride_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate+'/clickonrides', 'GET', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch(function(result){
        //This is where you would put an error callback
        return(result);
    });
}

async function deleteRide(_ride_id){
    additionalParams={
        queryParams:{
            ride_id:_ride_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate+'/deleteride', 'DELETE', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch(function(result){
        //This is where you would put an error callback
        return(result);
    });
}


async function getUserRides(_driver_id){
    additionalParams={
        queryParams:{
            driver_id:_driver_id
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate+'/getuserrides', 'GET', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch(function(result){
        //This is where you would put an error callback
        return(result);
    });
}

async function modifyRide(_ride_id, _datetime, _destination,_from, _destination_lat,_destination_long, _from_lat,_from_long, _seats, _users_joined,_description, _traction, _price, _safety_features,_driver_id, _car ){
    additionalParams={
        queryParams:{
            ride_id:_ride_id,
            datetime: _datetime,
            destination: _destination,
            destination_lat:_destination_lat,
            destination_long:_destination_long,
            from: _from,
            from_lat:_from_lat,
            from_long:_from_long,
            seats:_seats,
            users_joined:_users_joined,
            description:_description,
            traction:_traction,
            price:_price,
            safety_features:_safety_features,
            driver_id:_driver_id,
            car:_car
        }
    }
    return await apigClient.invokeApi(pathParams, pathTemplate+'/modifyride', 'PUT', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch( function(result){
        //This is where you would put an error callback
        return(result);
    });
}

async function rideListSearch(){
    return await apigClient.invokeApi(pathParams, pathTemplate+'/ridelistsearch', 'GET', additionalParams, body)
    .then(function(result){
        return(result.data);
        //This is where you would put a success callback
    }).catch(function(result){
        //This is where you would put an error callback
        return(result);
    });
}


rideListSearch().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

module.exports={
    addRide,
    getRideInfo,
    deleteRide,
    getUserRides,
    modifyRide,
    rideListSearch
}