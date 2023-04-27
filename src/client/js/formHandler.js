async function handleSubmit(event) {
    
    event.preventDefault()

    const formLocation = document.getElementById('form__location').value;
    const formDeparture = document.getElementById('form__depart').value;

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
    } catch (error) {
        console.log(error);
        alert('Something went wrong. Please try again later.');
    }
}

export { handleSubmit };