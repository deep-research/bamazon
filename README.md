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
* Once everything is ready, entering `node bamazonCustomer.js` into the command line will run the main program.