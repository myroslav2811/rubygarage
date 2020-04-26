const Task = require('../db/models/Task');

module.exports = (req, res) => {
    const projectId = req.params.id;
    Task.find({ projectId })
        .exec()
        .then(tasks => {
            res.status(200).json({ tasks });
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
}