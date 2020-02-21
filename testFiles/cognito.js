const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
AWS.config.update({
        credentials: {
            accessKeyId: "AKIA277LPWUTOAK737G4",
            secretAccessKey: "StvmpMafaWOnruUdLxp6HUqdvVssLHr66UTP7Oif"
        },
        region: 'us-east-1'
    });

// const poolData = {
//     UserPoolId: "us-east-1_IVvtM8Ze2", // Your user pool id here    
//     ClientId: "2r3qcaacllataokcj3ratitv2e" // Your client id here
// };
// const pool_region = 'us-east-1';

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//var cog = new AWS.CognitoIdentityServiceProvider();
const cognito = new AWS.CognitoIdentityServiceProvider({region:'us-east-1'})
// var filter = "sub = \"" + "14bfa0da-a8ba-4d4a-acb5-2a35315ea070" + "\"";
// var req = {
//     "Filter": filter,
//     "UserPoolId": "us-east-1_IVvtM8Ze2" // looks like us-east-9_KDFn1cvys
// };

try {
    cognito.adminGetUser({
        UserPoolId: "us-east-1_IVvtM8Ze2" ,
        Username: "14bfa0da-a8ba-4d4a-acb5-2a35315ea070",
    }).promise().then(user=>{
        console.log(user.UserAttributes)
    }).catch(err=>{
        console.log(err);
    })

  
}
catch{}



// cog.listUsers(req, function (err, data) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         if (data.Users.length === 1) { //as far as we search by sub, should be only one user.
//             var user = data.Users[0];
//             var attributes = user.Attributes;
//             console.log(attributes);
//         } else {
//             console.log("Something wrong.");
//         }
//     }
// });