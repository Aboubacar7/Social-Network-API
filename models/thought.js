const reactionSchema = require('./reaction')
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateformat
        },
        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

function dateformat (createdAt) {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a')
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought