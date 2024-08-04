const Workout = require('../models/workoutmodel')
const mongoose = require("mongoose");

//get all workouts
const getallworkout = async(req,res)=>{
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({createdAt: -1})
  res.status(200).json(workouts)
}
//get single workout
const getworkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error:"not a valid id"})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        res.status(404).json({error: "cannot find the workout"})
    }
    res.status(200).json(workout);
}

//create workout
const createworkout = async (req, res) => {
  const {title, weight, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!weight) {
    emptyFields.push('weight')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, weight, reps, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  }

//delete workout
const deleteworkout= async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error:"not a valid id"})
    }
    const workout = await Workout.findByIdAndDelete(id)
    if(!workout){
        res.status(404).json({error: "cannot find the workout"})
    }
    res.status(200).json(workout);
}

//update an workout
const updateworkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error:"not a valid id"})
    }
    const workout = await Workout.findByIdAndUpdate({_id:id},{...req.body},{ new: true })
    if(!workout){
        res.status(404).json({error: "cannot find the workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    createworkout,
    getallworkout,
    getworkout,
    deleteworkout,
    updateworkout
}