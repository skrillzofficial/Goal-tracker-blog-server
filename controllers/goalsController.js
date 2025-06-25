const Goal = require("../models/goalSchema")

// a. create a goal;
const createGoal = async (req, res) => {
    const {userId} = req.user;
    req.body.createdby = userId
    try {
       const goal = await Goal.create(req.body) 
       res.status(201).json({success: true, goal})
    } catch (error) {
        res.json({error})
    }
}

// b. get all  goals;
const getGoals = async (req, res) => {
    const {userId} = req.user;
    try {
        const goals = await Goal.find({createdby: userId})
        res.status(200).json({success:true, goals})
    } catch (error) {
        res.json({error})
    }
}

// c. get a single goal;
const getSingleGoal = async (req, res) => {
    const {userId} = req.user;
    const {goalId} = req.params;
    try {
        const goal = await Goal.findOne({createdby: userId, _id: goalId})
        res.status(200).json({success: true, goal})
    } catch (error) {
        res.json({error})
    }
}

// d. update a blog;
const updateGoal = async (req, res) => {
    const {userId} = req.user;
    const {goalId} = req.params;
    try {
      const  goal = await Goal.findOneAndUpdate({createdby: userId, _id: goalId}, req.body, {new: true}, {runValidators: true});
      res.status(200).json({success: true, goal})
    } catch (error) {
        res.json({error})
    }
}

// e. delete a goal;
const deleteGoal = async (req, res) => {
    const {userId} = req.user;
    const {goalId} = req.params;
    try {
        const goal = await Goal.findOneAndDelete({createdby: userId, _id:goalId})
        res.status(200).json({success: true, msg: "Goal deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}

module.exports = {createGoal, getGoals, getSingleGoal, updateGoal, deleteGoal}