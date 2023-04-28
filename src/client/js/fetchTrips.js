async function fetchTrips() {
    const response = await fetch('/myTrips');
    const trips = await response.json();
  
    const allTrips = document.getElementById('allTrips');
  
    trips.forEach(trip => {
      const { location, country, departure, temperature, description } = trip;
  
      const travelDate = new Date(departure).toLocaleDateString();
      const daysUntilTrip = Math.ceil((new Date(departure) - new Date()) / (1000 * 60 * 60 * 24));
  
      const tripCard = document.createElement('div');
      tripCard.classList.add('trip');
  
      tripCard.innerHTML = `
        <div class="trip__image"></div>
        <div class="trip__header">
          <h2>My trip to: ${location}, ${country} </br> Departing: ${travelDate}</h2>
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
          <p>${location}, ${country} is ${daysUntilTrip} days away.</p>
        </div>
        <div class="trip__weather">
          <p>The temperature will be ${temperature} degrees Fahrenheit</p>
          <p>The weather will be ${description}</p>
        </div>
      `;
  
      allTrips.appendChild(tripCard);
    });
  }
  
  export {
    fetchTrips
  }
  