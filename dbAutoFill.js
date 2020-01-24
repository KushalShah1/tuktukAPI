var api = require("./tuktukAPIInterface");
let destinations = ['Walmart', 'Whole Foods', 'India Bazaar', 'Subzi Mundi', 'Baskin Robbins', 'UT Austin', 'Iran', 'Disney World', 'Fort Worth Stockyard', 'Panda EXP', 'Topgolf', 'Downtown'];
let from = ['Wampus', 'EER', 'Tower', 'North Campus', 'Plano', 'Capital Factory', 'Starbucks', 'Chase Oaks', 'PSHS', 'Davis Library', 'Carpenter Rec Center', 'Tom Mullenbeck Dog Park', 'Zilker'];
let datetime= '2020-01-01T10:10:10';
let description= 'Wowza a description';

for (let i = 0; i < 5; i++) {
    let rand=Math.random();
    api.addRide(datetime,destinations[Math.floor(rand*destinations.length)],from[Math.floor(rand*from.length)], Math.floor(rand*100), Math.floor(rand*100), Math.floor(rand*200), Math.floor(rand*200), Math.floor(rand*6), description, Math.floor(rand*50), Math.floor(rand*10),null,Math.floor(rand*300), 'corolla').then(res=>{
        console.log(res);
    })
}
