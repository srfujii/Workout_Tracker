
/*** CLIENT-SIDE JAVASCRIPT ***/

async function initWorkout() {
  // Get latest workout, if any (FETCH/GET)
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  
  // If there is a latest workout
  if (lastWorkout) {

    // Set the href attribute on one of the index.html links to /exercise?id="0w2r3kkaf3093ojfwlwek"
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };

    // Render the summary of the latest workout on the index.html page
    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

// Tally all of the exercises in a workout
function tallyExercises(exercises) {

  // Array reduce method reduces array to a single element based function you provide
  // Acc = "accumulated"
  // Curr = "current value"
  const tallied = exercises.reduce((acc, curr) => {

    // For each item in our array, accumulate / sum up the fields
    if (curr.type === "resistance") {
      // Accumulated total weight += current value's weight
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      // Accumulated total sets += current value's sets
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      // Accumulated total reps += current value's reps
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      // Accumulated total distance += current distance
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    // Return our accumulated object to advance to next element in array and go again
    return acc;
  }, {});

  // Return the final "tallied" result of our Array Reducer function (accumulator):
  return tallied;
}


// Format the date based on these options
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}


// Render the workout summary stats on the index.html page
function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}


// Render "You have not created a workout yet!" to index.html
function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
