const { Task } = require('../db/models/');

module.exports = (req, res) => {
    Task.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name })
        .exec()
        .then(() => {
            Task.find({ projectId: req.body.projectId })
                .exec()
                .then(tasks => {
                    res.status(200).json({ tasks })
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
};