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

    const goal = await Goal.create({
        text: req.body.text,
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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: `Update goal ${req.params.id}` })
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

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}
