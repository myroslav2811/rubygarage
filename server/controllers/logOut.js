const { Token } = require('../db/models');

module.exports = (req, res) => {
    Token.findOneAndRemove({ userId: req.payload.userId0 })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'OK' });
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
}

