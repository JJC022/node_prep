const express = require("express")
const cache = require("memory-cache")
const app = express()


"Callback style"
db.getUser(userId, (err, result) => {
    if (err) { /* handle error */ }
    else { /* do something with result */ }
  });
  // key thing: await only works with promises - need to modify the function so that it returns a promise 
async function getUserDetails(userId) {
    try {
      const user = await db.getUser(userId);
      const orders = await db.getOrders(userId);
      const cart = await db.getCart(userId);
      
      console.log({ user, orders, cart });
    } catch (err) {
      console.error(err);
    }
  }


//MySQL callback example excercise 

// fake database module
const db = {
    getMedicarePlans: function(state, callback) {
      setTimeout(() => {
        if (!state) {
          callback(new Error("State is required"), null);
        } else {
          callback(null, [
            { id: 1, name: "Silver Health Plan", state: state },
            { id: 2, name: "Gold Health Plan", state: state }
          ]);
        }
      }, 500); // simulate async delay
    },
    getDoctors: function(state, callback) {
      setTimeout(() => {
        if (!state) {
          callback(new Error("State is required for doctors"), null);
        } else {
          callback(null, [
            { id: 10, name: "Dr. Smith", state: state },
            { id: 11, name: "Dr. Johnson", state: state }
          ]);
        }
      }, 300); // doctors load faster
    }
  };
  
  
  
  function promisify(fn){
    return (...args) => new Promise((resolve, reject) => {
        fn(...args, (err, result)=>{
            if (err) reject(err); 
            else resolve(result);
        });
    });
  }

  const getMedicarePlansPromise = promisify(getMedicarePlans)

  async function fetchPlans(state){
    try{
        await getMedicarePlansPromise(state)
    }catch(error){
        console.log(error)
    }
  }
fetchPlans('CA');    // should log the list
fetchPlans(); 