const { Project } = require('../db/models');

module.exports = (req, res) => {
    const { userId } = req.payload;
    const { name } = req.body;
    console.log(name, userId);
    Project.create({ name, userId })
        .then(() => {
            Project.find({ userId })
                .exec()
                .then(projects => {
                    res.status(200).json({ projects })
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                })
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
};