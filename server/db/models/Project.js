const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Project', ProjectSchema);