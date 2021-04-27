
/*** CLIENT-SIDE JAVASCRIPT ***/

init();


async function init() {
  // If no query string, fetch/retrieve the latest workout
  if (location.search.split("=")[1] === undefined) {

    // Fetch/retrieve the latest workout
    const workout = await API.getLastWorkout();

    // If there is a recent workout
    if (workout) {
      // Add latest workout id to the query string
      location.search = "?id=" + workout._id;
    } else {
      // Otherwise if no recent workout, do not display "Continue Workout" button on index.html
      document.querySelector("#continue-btn").classList.add("d-none")
    }

  }
}

