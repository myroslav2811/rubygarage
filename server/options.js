module.exports = {
    jwtOpt: {
        secretKey: '38wbNQtEvk',
        token: {
            access: {
                type: 'access',
                expiresIn: '30m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '1h'
            }
        }
    }

}