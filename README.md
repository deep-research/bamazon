# bamazon

A trading application written with Node.js and MySQL Server. This program allows customers to purchase existing products from a database with command line input.

### Prerequisites

* A command-line interpreter.
* An updated Node.js installation.
* An updated MySQL Server installation

### Installation

* Download the application as a ZIP file or with the `git clone https://github.com/deep-research/bamazon` command in a Git command line such as Git Bash.
* The new directory will be called `bamazon`. Extracting the file may be necessary.
* Change directory to `bamazon` in a command-line interpreter.
* Run the `npm install` command to prepare the necessary NPM packages.
* Make sure that a database server instance of MySQL Server is running.
* Run the `schema.sql` script in MySQL Server to create the database.
* Run the `insert-ten.sql` script in MySQL Server to populate the `products` table.
* Make sure the database credentials in the bamazonCustomer.js file are correct for your system.
    * In Windows, your password can be saved as an environmental variable and referenced as `process.env.YOUR_MYSQL_PASSWORD`.
* Once everything is ready, entering `node bamazonCustomer.js` into the command line will run the main program.

### Screenshot Descriptions

1. The program starts by listing information on every item in the inventory.
2. The user is then prompted to buy an item. If the transaction is sucessful, the total cost of the order is displayed.
3. If the order is too large, the user is asked whether they would like to try again.
    * If the user say no, the program is closed.
    * If the user says yes, the program returns to step two.
4. This is what the database looked like before the transaction was made.
5. After the transaction, the stock quantity of guitar amplifiers was reduced by three from eighteen to fifteen.