module.exports = {
    config: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    }
    // config: {
    //     user: "postgres",
    //     host: "localhost",
    //     database: "greenfield_reviews",
    //     password: "pawscat",
    //     port: 5432
    // }
};