const mongoose = require("mongoose")

const goalSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Please add a text value."],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Goal Schema", goalSchema)

// const goalModel = mongoose.Schema(
//     {
//         text: {
//             type: String,
//             required: [true, "Please add a text value."],
//         },
//     },
//     {
//         timestamps: true,
//     }
// )

// module.export = mongoose.model("Goal Model", goalModel)
