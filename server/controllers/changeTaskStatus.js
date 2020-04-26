const { Task } = require('../db/models/');

module.exports = (req, res) => {
    Task.findOneAndUpdate({ _id: req.body.id }, { status: !req.body.status })
        .exec()
        .then(task => {
            Task.find({ projectId: req.body.projectId })
                .exec()
                .then(tasks => {
                    res.status(200).json({ tasks });
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
};