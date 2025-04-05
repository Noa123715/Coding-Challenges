CREATE DATABASE SUPERMARKET_APP;

USE SUPERMARKET_APP;

CREATE TABLE UserTypes (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Catalogs (
    catalog_id INT AUTO_INCREMENT PRIMARY KEY,
    catalog_name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL UNIQUE
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    company_name VARCHAR(50),
    phone_number VARCHAR(15) NOT NULL,
    contact_person VARCHAR(50),
    catalog_id INT,
    password INT NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES UserTypes(type_id),
    FOREIGN KEY (catalog_id) REFERENCES Catalogs(catalog_id)
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    price_per_item DECIMAL(10,2) NOT NULL,
    min_quantity INT NOT NULL,
    catalog_id INT NOT NULL,
    FOREIGN KEY (catalog_id) REFERENCES Catalogs(catalog_id)
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