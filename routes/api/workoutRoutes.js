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

// Update a workout
router.put('/:id', async (req, res) => {
   
try {
    const result = await Workout.update(
        { _id: req.params.id }, 
        { $push: { exercises: req.body } }
    );
    res.json(result);
} catch (err) {
    res.json(err);
}

});

module.exports = router;
