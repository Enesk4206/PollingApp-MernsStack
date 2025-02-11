const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    type: { type: String, required: true }, //single choice, rate, yes/no, etc.
    options: [{

        optionText: { type: String, required: true },
        votes: { type: Number, default: 0 }, //for vote tracking
    }],
    responses: [
        {
            voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            responseText: { type: String },     //text of users responses
            createdAt: { type: Date, default: Date.now },
        },
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    voters: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    }],
    createdAt: { type: Date, default: Date.now },
    closed: { type: Boolean, default: false }, //to mark polls as closed
});

module.exports = mongoose.model("Poll", PollSchema);