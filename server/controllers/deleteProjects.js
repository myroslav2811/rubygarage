const { Project } = require('../db/models')

module.exports = (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id })
        .exec()
        .then(() => {
            Project.find({ userId: req.payload.userId })
                .exec()
                .then(projects => {
                    res.status(200).json({ projects });
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                })
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
}