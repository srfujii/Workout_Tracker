
/*** CLIENT-SIDE JAVASCRIPT ***/

const API = {

  // Get latest workout from database
  // GET from: /api/workouts
  async getLastWorkout() {
    let result;
    try {
      result = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await result.json();
    return json[json.length - 1];
  },


  // Add new exercise to existing workout
  // PUT to: /api/workouts/<unique workout id>
  async addExercise(data) {
    // Returns the query string portion of a URL, e.g. ?email=test@test.com
    // Split this query string on the = and save the VALUE to the id variable
    const id = location.search.split("=")[1];
    // Fetch (PUT) /api/workouts/<unique id from above>
    const result = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await result.json();
    return json;
  },


  // Create new workout in database, return result
  // POST to: /api/workouts/ 
  async createWorkout(data = {}) {
    const result = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await result.json();
    return json;
  },


  // Get workouts in a specific range
  // GET from: /api/workouts/range
  async getWorkoutsInRange() {
    const result = await fetch(`/api/workouts/range`);
    const json = await result.json();
    return json;
  },
};
