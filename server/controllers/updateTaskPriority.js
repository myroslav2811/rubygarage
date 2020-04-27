const { Task } = require('../db/models');

const updateTasks = async (tasks, res) => {
    for (const item of tasks) {
        await Task.findByIdAndUpdate(item._id, { priority: item.priority })
            .exec()
            .then(task => {
                console.log(task);
            })
            .catch(err => {

            })
    }

    const { projectId } = tasks[0];
    Task.find({ projectId })
        .exec()
        .then((tasks) => {
            res.status(200).json({ tasks })
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })


}

module.exports = (req, res) => {
    updateTasks(req.body.tasks, res);
}
