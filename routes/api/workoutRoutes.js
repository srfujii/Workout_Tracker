const router = require('express').Router();
const { Workout, Exercise } = require('../../models');

// /api/workouts

// Get all workouts
router.get('/', async (req, res) => {
try {
    const workouts = await Workout.find();
    // .populate("exercises");
    res.json(workouts);
} catch (err) {
    res.json(err);
}
});

// Get all workouts in a range
router.get('/range', async (req, res) => {
try {
    const workouts = await Workout.aggregate([
        { $addFields: {
            totalDuration: { $sum: '$exercises.duration' }
            }
        }])
        .sort({ _id: -1 })
        .limit(7);

    // .populate("exercises");
    res.json(workouts);
} catch (err) {
    res.json(err);
}
});


// Create new workout
router.post('/', async ({ body }, res) => {
try {
    const workouts = await Workout.create({ body });
    // .populate("exercises");
    res.json(workouts);
} catch (err) {
    res.json(err);
}
});


// Add exercise to workout
router.put('/:id', async ({body}, res) => {
try {
    const exercise = await Exercise.create(body);
    const result = await Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true });
    res.json(result);
} catch (err) {
    res.json(err);
}  
});

module.exports = router;
