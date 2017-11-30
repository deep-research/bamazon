DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name  VARCHAR(45) NOT NULL,
  price DEC(9,2) NOT NULL,
  stock_quantity INT UNSIGNED DEFAULT 0,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;