window.addEventListener('load', fetchTrips);

import { handleSubmit } from './js/formHandler'
import { setButtonEventListeners } from './js/formHandler'
import { saveTrip } from './js/tripFunctions'
import { removeTrip } from './js/tripFunctions'
import { fetchTrips } from './js/fetchTrips'

import './styles/main.scss'

export {
    handleSubmit,
    saveTrip,
    removeTrip,
    setButtonEventListeners,
    fetchTrips
}