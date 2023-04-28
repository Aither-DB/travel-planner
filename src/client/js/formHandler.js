import { saveTrip } from "./tripFunctions";
import { removeTrip } from "./tripFunctions";

async function handleSubmit(event) {
    
    event.preventDefault()

    const formLocation = document.getElementById('form__location').value;
    const formDeparture = document.getElementById('form__depart').value;
    const travelDate = new Date(formDeparture);
    const currentDate = new Date();
    const daysUntilTrip = Math.ceil((travelDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const formattedTravelDate = travelDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    try {
        const response = await fetch(`http://localhost:8081/data`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: formLocation, departure: formDeparture })
        });

        if (!response.ok) {
            throw new Error('Something went wrong. Please try again later.');
        }

        const data = await response.json();

        // Console log JSON response

        console.log(`The latitude of ${formLocation} is ${data.lat}`);
        console.log(`The longitude of ${formLocation} is ${data.lng}`);
        console.log(`The country of ${formLocation} is ${data.country}`);
        console.log(`The date you depart is ${formDeparture}`);
        console.log(`You depart in ${daysUntilTrip} days`);
        console.log(`The temperature in ${formLocation} on ${formattedTravelDate} will be ${data.temperature} degrees Fahrenheit`);
        console.log(`The weather in ${formLocation} on ${formattedTravelDate} will be ${data.description}`);
        console.log(`The image URL for your destination is ${data.imageUrl}`);

        // Generate tiles

        const tileHTML = `
        <div class="trip">
            <div class="trip__image" style="background-image: url('${data.imageUrl}'); background-size: cover; background-position: center;"></div>
            <div class="trip__header">
                <h2>My trip to: ${formLocation}, ${data.country} </br> Departing: ${formattedTravelDate}</h2>
            </div>
            <div class="trip__buttons">
                <div class="trip__button--save">
                    <button class="trip__button" onclick="">save trip</button>
                </div>
                <div class="trip__button--remove">
                    <button class="trip__button" onclick="">remove trip</button>
                </div>
            </div>
            <div class="trip__days">
                <p>Your trip to ${formLocation}, ${data.country} is ${daysUntilTrip} days away</p>
            </div>
            <div class="trip__weather">
                <p>The temperature will be ${data.temperature} degrees Fahrenheit</p>
                <p>The weather will be ${data.description.toLowerCase()}</p>
            </div>
        </div>
        `;

        // Find the div with the id "allTrips" in your HTML file
        const allTrips = document.getElementById("allTrips");

        // Add the HTML code to the div
        allTrips.innerHTML += tileHTML;

        // Set the event listeners for the save and remove buttons
        setButtonEventListeners(data, formLocation, formDeparture, daysUntilTrip);

    } catch (error) {
        console.log(error);
        alert('Something went wrong. Please try again later.');
    }
}

// Event Listeners on buttons

function setButtonEventListeners(data, formLocation, formDeparture, daysUntilTrip) {
    const saveButton = document.querySelector('.trip__button--save button');
    const removeButton = document.querySelector('.trip__button--remove button');

    saveButton.addEventListener('click', () => saveTrip(formLocation, data, formDeparture, daysUntilTrip));
    removeButton.addEventListener('click', () => removeTrip(formLocation, data, formDeparture));
}

export {
    handleSubmit,
    setButtonEventListeners
 };