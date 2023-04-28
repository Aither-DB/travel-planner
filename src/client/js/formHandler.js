async function handleSubmit(event) {
    
    event.preventDefault()

    const formLocation = document.getElementById('form__location').value;
    const formDeparture = document.getElementById('form__depart').value;
    const travelDate = new Date(formDeparture);
    const currentDate = new Date();
    const daysUntilTrip = Math.ceil((travelDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
   

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

        console.log(`The latitude of ${formLocation} is ${data.lat}`);
        console.log(`The longitude of ${formLocation} is ${data.lng}`);
        console.log(`The country of ${formLocation} is ${data.country}`);
        console.log(`The date you depart is ${formDeparture}`);
        console.log(`You depart in ${daysUntilTrip} days`);
        console.log(`The temperature in ${formLocation} on ${travelDate} will be ${data.temperature} degrees Fahrenheit`);
        console.log(`The weather in ${formLocation} on ${travelDate} will be ${data.description}`);



    } catch (error) {
        console.log(error);
        alert('Something went wrong. Please try again later.');
    }
}

export { handleSubmit };