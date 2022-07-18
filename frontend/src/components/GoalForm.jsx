import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { createGoal } from "../features/goals/goalSlice"

const GoalForm = () => {
    const [text, setText] = useState("")
    const dispath = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispath(createGoal({ text }))
        setText("")
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm
