const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: {
            required: [true, "Please add a name."],
            type: String,
        },

        email: {
            required: [true, "Please add a email."],
            type: String,
            unique: true,
        },

        password: {
            required: [true, "Please add a password."],
            type: String,
        },

        // nick_name: {
        //     required: [true, "Please add a nick_name."],
        //     type: String,
        // },
    },
    {
        timestamp: true,
    }
)

module.exports = mongoose.model("User", userSchema)
