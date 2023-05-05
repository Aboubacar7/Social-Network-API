const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateformat
            // get: (timestamp) => dateFormat(timestamp).toISOString()
        }
    }
)

function dateformat (createdAt) {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a')
};

module.exports= reactionSchema;