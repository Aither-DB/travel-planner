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
const port = process.env.PORT

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// POST route

app.post('/data', async (req, res) => {
    try {
        const location = req.body.location;
        const departure = req.body.departure;
        
        if (!location) {
            return res.status(400).send('Please enter a city name');
        }

        // Make a request to the GeoNames API to get information about the location
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);

        // Parse the response as JSON
        const data = await response.json();

        // Check if any results were returned
        if (data.geonames && data.geonames.length > 0) {
            // Extract the latitude, longitude, and country from the response
            const lat = data.geonames[0].lat;
            const lng = data.geonames[0].lng;
            const country = data.geonames[0].countryName;

            // Log the results to the console
            console.log(`The latitude of ${location} is ${lat}`);
            console.log(`The longitude of ${location} is ${lng}`);
            console.log(`The country of ${location} is ${country}`);

            // Send the latitude, longitude, and country back to the client
            res.send({
                lat,
                lng,
                country
            });
        } else {
            console.log(`No results found for ${location}`);
            
            // Send a message back to the client indicating that no results were found
            res.send(`No results found for ${location}`);
        }
    } catch (error) {
        console.log(error);
    }
});

