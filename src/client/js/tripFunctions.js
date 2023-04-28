// Save trips and remove trips from server

// Save trip to server
async function saveTrip(tripId) {
    const response = await fetch('http://localhost:8081/saveTrip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tripId }),
    });
    const result = await response.text();
    console.log(result);
  }
  
  // Remove trip from server
  async function removeTrip(tripId) {
    const response = await fetch('http://localhost:8081/removeTrip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tripId }),
    });
    const result = await response.text();
    console.log(result);
  
    // Remove tile from UI
    const tripTile = document.querySelector(`[data-id="${tripId}"]`);
    tripTile.remove();
  };

  export {
    saveTrip,
    removeTrip
  }