const { Task } = require('../db/models');

module.exports = (req, res) => {
    const { name, projectId, priority } = req.body;
    Task.create({ name, projectId, priority })
        .then((resp) => {
            Task.find({ projectId })
                .exec()
                .then(tasks => {
                    res.status(200).json({ tasks })
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                })
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
};