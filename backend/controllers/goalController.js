// why controllers required: to define functions such as get goals

const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")

// @desc GET goals
// @route Get /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: "Get goals" })
    const goals = await Goal.find()

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
    res.status(200).json({ message: "Set goal" })
})

// @desc PUT goals
// @route PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}
