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
                if (value > 0 && value <= 10) {
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
        var itemNumber = answers.id
        var orderCount = answers.count

        checkInventory(itemNumber, orderCount)
    });    
}

var checkInventory = function(item, order) {
    connect.query("SELECT stock_quantity FROM products " +
                  "WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        var inventory = res[0].stock_quantity

        if (order > inventory) {
            console.log("We only have " +  inventory + " in stock!")
            console.log("")
            orderAgain()
        } else {
            makeAnOrder(item, order, inventory)
        }
    })
}

var orderAgain = function() {
    var question = [
        {
            type: 'confirm',
            name: 'continue',
            message: "Would you like to try again?"
        }
    ]
    inquirer.prompt(question).then(answer => {
        if (answer.continue) {
            console.log("")
            makePurchase()
        } else {
            process.exit()
        }
    });       
}

var makeAnOrder = function(item, order, oldInventory) {
    var updatedInventory = oldInventory - order

    connect.query("UPDATE products SET stock_quantity=" + updatedInventory +
                  " WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        getPrice(item, order)
    })
}

var getPrice = function(item, count) {
    connect.query("SELECT price FROM products " +
                  "WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        var unitPrice = res[0].price
        var totalCost = unitPrice * count

        console.log("Order total: $" + totalCost)

        connect.end()
    })
}