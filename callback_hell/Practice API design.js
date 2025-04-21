//design API for hospital / insurance plan / formulary / provider 
// create a RESTful API using express and mysql2
const app = require('express')();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = requrie('express-rate-limit');

// create a connection to the database
pool = mysql.createPool({
  host: 'localhost', 
  password: 'password',
  user: 'root',
  queueMicrotasks: false,
    database: 'healthcare',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 10000,
    connectTimeout: 10000,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('path/to/server-cert.pem'),
        key: fs.readFileSync('path/to/client-key.pem'),
        cert: fs.readFileSync('path/to/client-cert.pem')
    },
})
// create a rate limiter to limit the number of requests to 100 per minute
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
})

// token authentication 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if the token has expired
        req.user = user;
        next(); // pass the execution
    });
}

// build base of API
app.use('/api', authenticateToken, function(req, res, next) {
    // middleware to check if user is authenticated
    console.log('User is authenticated!');
    next(); // pass the execution to the next middleware or route handler
});
app.use(cors()); // enable CORS for all routes
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(limiter)


app.users = require('express').Router();
//rewrite as promise or async/await
app.users.get('/', async function(req, res) {
    // rewrite as promise or async/await
    try{
        const [rows] = await pool.promise().query('SELECT * FROM users');
        res.json(rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
app.users.post('/', async function(req, res) {
  try{
    const {name, email, password } = req.body;
    const req =  await pool.promise().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password])
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.status(201).json({ message: 'User created successfully' });   
});


// define healthcare providers
app.providers = require('express').Router();

// get all providers 
app.providers.get('/', async function(req, res) {
    // rewrite as promise or async/await
    try{
        const [rows] = await pool.promise().query('SELECT * FROM providers');
        res.json(rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// get providers by state
app.providers.getByState = async function(req, res) {
    try{
        const state = req.params.state;
        const [rows] = await pool.promise().query('SELECT * FROM providers WHERE state = ?', [state]); // be sure to use wildcard to prevent SQL Injection
        res.json(rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
app.providers.post('/', async function(req, res) {
  try{
    const {name, email, password } = req.body;
    const req =  await pool.promise().query('INSERT INTO providers (name, email, password) VALUES (?, ?, ?)', [name, email, password])
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.status(201).json({ message: 'Provider created successfully' });   
}   
);