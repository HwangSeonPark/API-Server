const production = {
    PORT :3000,
    DB:{
        host:"localhost",
        user:'root',
        database:'vue',
        password:'980421-122511z',
        port:"3306",
        connectionLimit:20,
        connectTimeout: 5000,
    },
}
const development = {
    PORT :4000,
    DB:{
        host:"localhost",
        user:'root',
        database:'vue',
        password:'980421-122511z',
        port:"3306",
        connectionLimit:20,
        connectTimeout: 5000,
    },
}

module.exports = { production, development}