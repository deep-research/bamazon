var mysql = require("mysql")

var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "bamazon"
})

connect.connect(function (err) {
    if(err) throw err;

    selectAll()
    connect.end();
})

function selectAll() {
    connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err
        for (i=0; i<res.length; i++) {
            console.log("Item "+ res[i].item_id + ": " +
                        res[i].product_name +
                        " ($" + res[i].price + ")")
        }
    })
}
