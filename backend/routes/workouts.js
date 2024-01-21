const express = require('express');
const { getWorkouts,
    getWorkout,
    createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

const router = express.Router();
//Get all workouts
router.get('/', getWorkouts);

//Get a single workout 
router.get('/:id', getWorkout);

//post a new workout 
router.post('/', createWorkout);

//delete a new workout 
router.delete('/:id', deleteWorkout);

//update a new workout 
router.patch('/:id', updateWorkout);

module.exports = router

