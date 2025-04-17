// medicarePlans.js

const mysql = require('mysql');

module.exports.getPlans = function (req, res) {
  

  connection.connect(function (err) {
    if (err) {
      console.log('Connection error', err);
    }
    connection.query('SELECT * FROM partdplans WHERE state="' + state + '"', function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        var cleaned = [];
        for (var i = 0; i < results.length; i++) {
          var plan = results[i];
          if (plan.name && plan.premium) {
            cleaned.push(plan);
          }
        }
        res.json({
          plans: cleaned
        });
      } else {
        res.send('no plans found');
      }
    });
  });
};

// MY CODE STARTS HERE 

module.exports.cleanedPlans = function (planData){
    return planData
}

const mysql = require('mysql');

const validateRequest = function (req, res){

    const state = req.query.state;

    if (!state) {
      res.send('missing state');
      return;
    } 
    if (!state in validStates){
        res.send('not a valid state name')
    }

}

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medicare'
    }
async function establishConnection (connectionConfig){
    [host, user, password, database] = connectionConfig //unpack configs
    const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
    });
    return connection
}

const testConnection = function(connection){
    try{
        connection.connect(function (err) {
            if (err) {
            console.log('Connection error', err);
            }
        })
    }catch (err){
        console.log("Error: " + err)
    }finally{
        return connection
    }
    }

async function queryDb(connection, state) {
    // Missing 'state' parameter in function definition
    
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM partdplans WHERE state="' + state + '"', function(error, results, fields) {
        if (error) {
            console.log(error);
            reject(error);
        }
        if (results) {
            resolve(results);
        }
        });
    });
    }

const cleanResults = function(results){
    if (results.length > 0) {
        var cleaned = [];
        for (let i = 0; i < results.length; i++) {
          var plan = results[i];
          if (plan.name && plan.premium) {
            cleaned.push(plan);
          }
        }
        return cleaned
    }
}

const sendResponse = function(cleaned){
    if(cleaned.length > 0 ){
        res.json({
            plans: cleaned
        })
    } else {
      res.send('no plans found');
    }
}
