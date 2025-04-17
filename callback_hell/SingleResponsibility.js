// BAD: Does too many things at once
async function createUserAndSendWelcomeEmail(userData) {
    try
}


//Good: each function does one thing 

function validateData(userData){
    return new Promise((resolve, reject) =>{
        if(!userData.email || ! userData.name){
            return reject("Operation failed");
        } else 
        resolve(userData)
    }
    )
}

async function createUser(userData){
    // Save user to db
    console.log("Saving user to database", userData.name)
}

async function sendEmail(userData){
    console.log("Sending email to", userData.name)
}



//next level
// Fake database save
async function saveToDatabase(userData) {
    console.log("Attempting to save to database...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random failure (20% chance)
            if (Math.random() < 0.2) {
                reject(new Error("Database save failed"));
            } else {
                resolve(`User ${userData.name} saved!`);
            }
        }, 300);
    });
}

// Fake email sender
async function sendWelcomeEmail(userData) {
    console.log(`Sending welcome email to ${userData.email}...`);
}

// Your mission: implement this
async function createUserAndSendWelcome(userData) {
    try{
        await validateData(userData)
        await saveToDatabase(userData);
        await sendWelcomeEmail(userData);
    }catch (error){
        console.log("Error: ", error.message || error)
    }finally{
        console.log("Finished attempt")
    }
}

// 🚀 Try calling it
createUserAndSendWelcome({ name: "Alice", email: "alice@example.com" });
createUserAndSendWelcome({ name: "Bob" }); // Missing email, should fail at validation
