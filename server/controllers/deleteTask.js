const { Task } = require('../db/models')

module.exports = (req, res) => {
    Task.findOneAndRemove({ _id: req.params.id })
        .exec()
        .then(() => {
            Task.find({ projectId: req.params.projectId })
                .exec()
                .then(tasks => {
                    res.status(200).json({ tasks });
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                })
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
}