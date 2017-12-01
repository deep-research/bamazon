var mysql = require("mysql")
var inquirer = require("inquirer")

// MySQL connection info
var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "bamazon"
})

// Make the connection
connect.connect(function (err) {
    if(err) throw err;

    // Start by showing them the catalog
    viewCatalog()
})

// Display the current catalog
var viewCatalog = function() {
    // MySQL query
    connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err

        // Section Title
        console.log("PRODUCT LISTING")

        // Catalog length
        var productCount = res.length

        // Format and display the results
        for (i=0; i<productCount; i++) {
            console.log("Item "+ res[i].item_id + ": " +
                        res[i].product_name +
                        " ($" + res[i].price + ")")
        }

        console.log("")

        // Continue by asking them to make a purchase
        makePurchase(productCount)
    })
}

// Inquirer helps the user make a purchase
var makePurchase = function(productCount) {
    // Section Title
    console.log("BUY AN ITEM")

    var questions = [
        // Ask which item they want to purchase
        {
            type: 'input',
            name: 'id',
            message: "Enter an item number:",
            // Make sure they enter a valid product number
            validate: function(value) {
                if (value > 0 && value <= productCount) {
                  return true;
                }      
                return 'Please enter a valid number';
              }
        },
        // Ask how many they would like to purchase
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
        // Inquirer results
        var itemNumber = answers.id
        var orderCount = answers.count

        // Check the inventory to see if the order can be processed
        checkInventory(itemNumber, orderCount, productCount)
    });    
}

// Find out if there is enough in stock to make the order
var checkInventory = function(item, order, productCount) {
    // MySQL query
    connect.query("SELECT stock_quantity FROM products " +
                  "WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        // Inventory size
        var inventory = res[0].stock_quantity

        // If the order was too high
        if (order > inventory) {
            // Displayan error message
            console.log("We only have " +  inventory + " in stock!")
            console.log("")

            // Ask them if they would like to try again
            orderAgain(productCount)
        } else {
            // If there is enough, make the process the order
            makeAnOrder(item, order, inventory)
        }
    })
}

// Inquirer prompt to restart the ordering process
var orderAgain = function(productCount) {
    var question = [
        {
            type: 'confirm',
            name: 'continue',
            message: "Would you like to try again?"
        }
    ]
    inquirer.prompt(question).then(answer => {
        // Restart the process if they agree
        if (answer.continue) {
            console.log("")
            makePurchase(productCount)
        // Exit the program if they don't agree
        } else {
            connect.end()
        }
    });       
}

// Process the order request by reducing the inventory size
var makeAnOrder = function(item, order, oldInventory) {
    // Subtraction to get the new inventory size
    var updatedInventory = oldInventory - order

    // MySQL UPDATE statement
    connect.query("UPDATE products SET stock_quantity=" + updatedInventory +
                  " WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        // Then find the total price they will have to pay
        getPrice(item, order)
    })
}

// Calculate the total price of the purchase
var getPrice = function(item, count) {
    // MySQL query
    connect.query("SELECT price FROM products " +
                  "WHERE item_id=" + item, function(err, res) {
        if(err) throw err

        // Multiplication to get the total price
        var unitPrice = res[0].price
        var totalCost = unitPrice * count

        // Show the total cost to the user
        console.log("Order total: $" + totalCost)

        // Exit the program
        connect.end()
    })
}