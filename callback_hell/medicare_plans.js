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

async function getPlansRefactored(req, res){
    let connection; 
    try{
        const state = validateRequest(req);
        const connection = await establishConnection();
        const db_out = await queryDb(connection, state);
        const results = await cleanResults(db_out);
        sendResponse(results, res);
    }catch (error){
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection && connection.end) connection.end();
    console.log("Request finished");
  }
}

module.exports.getPlansRefactored = getPlansRefactored

const mysql = require('mysql');

const validateRequest = function (req, res){
    const state = req.query.state;

    if (!state) {
      throw new Error("state is required");
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
    return mysql.createConnection(connectionConfig)
}

async function queryDb(connection, state) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM partdplans WHERE state = ?', [state], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
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

function sendResponse(cleaned, res) {
    if (cleaned.length > 0) {
      res.json({ plans: cleaned });
    } else {
      res.status(404).json({ error: "No plans found for the given state" });
    }
  }
