const { auth, refreshTokens } = require('./auth');

module.exports = {
    signUp: require('./signUp'),
    auth,
    refreshTokens,
    getProjects: require('./getProjects'),
    putProject: require('./putProject'),
    deleteProject: require('./deleteProjects'),
    getTasks: require('./getTasks'),
    putTask: require('./putTask'),
    deleteTask: require('./deleteTask'),
    changeTaskStatus: require('./changeTaskStatus'),
    updateProject: require('./updateProject'),
    updateTask: require('./updateTask'),
    checkToken: require('./checkToken.js'),
    logOut: require('./logOut'),
    updateTaskPriority: require('./updateTaskPriority')
}