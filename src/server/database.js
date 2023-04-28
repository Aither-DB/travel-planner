// Handles removeTrip and saveTrip functions

const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, 'trips.db'), autoload: true });

function saveTrip(id) {
  db.insert({ id }, (err, newDoc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Trip saved: ${JSON.stringify(newDoc)}`);
    }
  });
}

function removeTrip(id) {
  db.remove({ id }, {}, (err, numRemoved) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Trip removed: ${numRemoved} trip(s) removed`);
    }
  });
}

module.exports = { saveTrip, removeTrip };
