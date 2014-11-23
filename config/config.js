module.exports = {
    db : {
        user : "",
        password : "",
        uri : "localhost",
        port : 27017,
        name : "game"
    },
    security : {
        tokenLife : 3600    // 1hr (in seconds)
    },
    server : {
        port : process.env.PORT || 80
    }
};
