var mysql = require("mysql")
var inquirer = require("inquirer")

var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "bamazon"
})

connect.connect(function (err) {
    if(err) throw err;

    viewCatalogue()
})

var viewCatalogue = function() {
    connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err
        console.log("PRODUCT LISTING")
        for (i=0; i<res.length; i++) {
            console.log("Item "+ res[i].item_id + ": " +
                        res[i].product_name +
                        " ($" + res[i].price + ")")
        }
        console.log("")
        console.log("BUY AN ITEM")
        makePurchase()
    })
}

var makePurchase = function() {
    var questions = [
        {
            type: 'input',
            name: 'id',
            message: "Enter an item number:",
            validate: function(value) {
                if (value > 0) {
                  return true;
                }      
                return 'Please enter a valid number';
              }
        },
        {
            type: 'input',
            name: 'count',
            message: "How many would you like?",
            validate: function(value) {
                if (value > 0) {
                  return true;
                }      
                return 'Please enter a valid number';
              }
        }
    ]
    inquirer.prompt(questions).then(answers => {
        console.log("The item number is: " + answers.id)
        console.log("Order amount: " + answers.count)
        connect.end()
    });    
}
