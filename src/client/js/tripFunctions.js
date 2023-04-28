// Save and remove trip functions

// Save function to send POST request to server with trip data to save

async function saveTrip(formLocation, data, formDeparture, daysUntilTrip) {

    const response = await fetch('http://localhost:8081/trips', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            location: formLocation,
            country: data.country,
            departure: formDeparture,
            daysUntilTrip,
            temperature: data.temperature,
            description: data.description,
        }),
    });

    if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.')
    };

    alert('Trip saved!');

}

// Remove function to send a DELETE request to the server

async function removeTrip(formLocation, data, formDeparture) {
    
    const response = await fetch('http://localhost:8081/trips', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            location: formLocation,
            country: data.country,
            departure: formDeparture,
        }),
    });

    if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.')
    };

    alert('Trip removed!');

}

export {
    saveTrip,
    removeTrip
}