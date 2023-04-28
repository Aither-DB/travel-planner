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
        const responseGeoNames = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);

        // Parse the responses as JSON
        const dataGeoNames = await responseGeoNames.json();

        // Check if any results were returned
        if (dataGeoNames.geonames && dataGeoNames.geonames.length > 0) {
            // Extract the latitude, longitude, and country from the response
            const lat = dataGeoNames.geonames[0].lat;
            const lng = dataGeoNames.geonames[0].lng;
            const country = dataGeoNames.geonames[0].countryName;

            // Log the results to the console
            console.log(`The latitude of ${location} is ${lat}`);
            console.log(`The longitude of ${location} is ${lng}`);
            console.log(`The country of ${location} is ${country}`);
            console.log(`The date you depart is ${departure}`);

            // Make a request to the Weatherbit API to get weather information for the location and departure date
            const responseWeatherbit = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&start_date=${departure}&days=1&units=I&key=${process.env.WEATHERBIT_API_KEY}`);

            // Parse the Weatherbit response as JSON
            const dataWeatherbit = await responseWeatherbit.json();

            // Extract the temperature and weather description from the Weatherbit response
            const temperature = dataWeatherbit.data[0].temp;
            const description = dataWeatherbit.data[0].weather.description;

            // Log the results to the console
            console.log(`The temperature in ${location} on ${departure} will be ${temperature} degrees Fahrenheit`);
            console.log(`The weather in ${location} on ${departure} will be ${description}`);

            // // Make a request to the Pixabay API to get images for the location
            // const responsePixabay = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(location)}&image_type=photo&orientation=horizontal&category=places`);

            // // Parse the Pixabay response as JSON
            // const dataPixabay = await responsePixabay.json();

            // // Check if any results were returned
            // if (dataPixabay.hits && dataPixabay.hits.length > 0) {
            //     // Extract the image URL and preview URL from the Pixabay response
            //     const imageUrl = dataPixabay.hits[0].largeImageURL;
            //     const previewUrl = dataPixabay.hits[0].previewURL;

            //     // Log the results to the console
            //     console.log(`The image URL for ${location} is ${imageUrl}`);
            //     console.log(`The preview URL for ${location} is ${previewUrl}`);
            // } else {
            //     console.log(`No images found for ${location}`);
                
            //     // Send a message back to the client indicating that no images were found
            //     res.send(`No images found for ${location}`);
            // }

            // Send the latitude, longitude, and country back to the client
            res.send({
                lat,
                lng,
                country,
                temperature,
                description,
                // imageURL,
                // previewURL
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

