// why controllers required: to define functions such as get goals

const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// @    desc GET goals
// @route Get /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: "Get goals" })
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc POST goals
// @route post /api/goals
// @access Private

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        // res.status(400).json({message: "Please add a text file."})
        res.status(400)
        throw new Error("Please add a text field.")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    // res.status(200).json({ message: "Set goal" })
    // res.status(200).json({ message: "Set goal" })
    res.status(200).json(goal)
})

// @desc PUT goals
// @route PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found.")
    }

    // Check user
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // res.status(200).json({ message: `Update goal ${req.params.id}` })
    res.status(200).json(updatedGoal)
})

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private

// This delete is working with findByIdAndDelete method
// const deleteGoal = asyncHandler(async (req, res) => {
//     // const goal = await Goal.deleteOne(req.params.id)
//     const goal = await Goal.findByIdAndDelete(req.params.id)

//     if (!goal) {
//         res.status(400)
//         throw new Error("Goal not found.")
//     }

//     const deletedGoal = await Goal.deleteOne(req.params.id)
//     res.status(200).json({ message: `Delete goal ${req.params.id}` })
//     res.status(200).json(deletedGoal)
// })

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found.")
    }

    // Check user
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}
