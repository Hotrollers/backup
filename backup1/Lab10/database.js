const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    connectionLimit: 10
})

pool.query(`select * from PicSuggestions`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})