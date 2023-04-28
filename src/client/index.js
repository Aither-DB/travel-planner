import { handleSubmit } from './js/formHandler'
import { saveTrip, removeTrip } from './js/tripFunctions';
import './styles/main.scss'

// Event listeners for Save and Remove buttons

const allTrips = document.getElementById('allTrips');
allTrips.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-button')) {
    saveTrip(event.target.dataset.id);
  } else if (event.target.classList.contains('remove-button')) {
    removeTrip(event.target.dataset.id);
  }
});

document.getElementById('generate').addEventListener('click', handleSubmit);

export {
    handleSubmit,
    saveTrip,
    removeTrip
}