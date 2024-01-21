const Workout = require('../models/workoutModels')
// ../ represents to move to previous file 

const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req, res) => {
    //req.params gives the id property
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id not found" })
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No such workout found " })
    }
    res.status(200).json(workout)
}

//create a single workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id not found" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id }) //_id: id property name in mongoose

    if (!workout) {
        return res.status(404).json({ error: "No such workout found " })
    }
    res.status(200).json(workout)
}

//update a workout 
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id not found" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body  //... is used to spread the particular object 
    })

    if (!workout) {
        return res.status(404).json({ error: "No such workout found " })
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}