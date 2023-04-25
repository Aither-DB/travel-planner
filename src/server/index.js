// Import and configure dotenv module to securely store API key
const dotenv = require('dotenv')
dotenv.config();

// Import and set up Node.js modules
var path = require('path')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express')
const app = express()

// Import and initialize bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import and initialize Cors
const cors = require('cors');
app.use(cors());

// Initialize main project folder
app.use(express.static('dist'))
console.log(__dirname)

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})