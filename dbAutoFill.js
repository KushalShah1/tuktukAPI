var api = require("./tuktukAPIInterface");
let destinations = ['Walmart', 'Whole Foods', 'India Bazaar', 'Subzi Mundi', 'Baskin Robbins', 'UT Austin', 'Iran', 'Disney World', 'Fort Worth Stockyard', 'Panda EXP', 'Topgolf', 'Downtown'];
let from = ['Wampus', 'EER', 'Tower', 'North Campus', 'Plano', 'Capital Factory', 'Starbucks', 'Chase Oaks', 'PSHS', 'Davis Library', 'Carpenter Rec Center', 'Tom Mullenbeck Dog Park', 'Zilker'];
let datetime= '2020-01-01T10:10:10';
let description= 'Wowza a description';

for (let i = 0; i < 20; i++) {
    api.addUser(Math.floor(Math.random()*1000), "None", "Male").then(data=>{
        console.log(data);
    })
}
