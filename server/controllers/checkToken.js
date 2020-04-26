const { User } = require('../db/models/')

module.exports = (req, res) => {
    User.findOne({ _id: req.payload.userId })
        .exec()
        .then(user => {
            res.status(200).json({ username: user.username });
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
}