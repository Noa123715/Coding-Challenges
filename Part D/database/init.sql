CREATE DATABASE SUPERMARKET_APP;

USE SUPERMARKET_APP;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('supplier', 'store_owner') NOT NULL,
    username VARCHAR(50) NOT NULL,
    company_name VARCHAR(50),
    phone_number VARCHAR(15) NOT NULL,
    contact_person VARCHAR(50),
    merchandise VARCHAR(50),
    password INT NOT NULL
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price_per_item DECIMAL(10, 2) NOT NULL,
    min_quantity INT NOT NULL,
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('new', 'in_progress', 'completed') NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sum INT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Order_Items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);