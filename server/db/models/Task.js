const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: Number
    }
})

module.exports = mongoose.model('Task', TaskSchema);