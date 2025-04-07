-- init the userType table
INSERT INTO UserTypes (type_name) VALUES ('supplier'), ('store_owner');

-- init the store_owner user
INSERT INTO Users (
    user_type_id,
    username,
    phone_number,
    company_name,
    password
) VALUES (
    2,                             -- store_owner code
    'Avraham',
    '053-312-3715',
    'Zol-Tov',
    1234
);

-- init the catalogs table
INSERT INTO Catalogs (catalog_name) VALUES ('Bakery products 🍰'),('Baking products 🍪'),('Cleaning products 🧻'),('Dairy products 🐮'),
												('Disposable products 🍽️'),('Fruits & Vegetables 🍎'),('Meat products 🍖'),('Snacks 🍫');

-- init the products table
-- Bakery products 🍰
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Baguette 🥖', 1.75, 10, 1),
('Chocolate Cake 🍫🎂', 5.00, 5, 1),
('Croissant 🥐', 2.50, 10, 1),
('Donuts 🍩', 1.50, 15, 1),
('Muffins 🧁', 3.00, 12, 1),
('Pound Cake 🍰', 4.00, 5, 1),
('Scones 🍪', 2.80, 7, 1),
('Tarts 🍰', 3.50, 6, 1);


-- Baking products 🍪 
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Baking Powder 🍞', 1.00, 30, 2),
('Baking Soda 🧂', 0.80, 50, 2),
('Butter 🧈', 2.00, 15, 2),
('Chocolate Chips 🍫', 2.75, 25, 2),
('Cocoa Powder 🍫', 3.00, 20, 2),
('Cornstarch 🌽', 1.50, 30, 2),
('Flour 🌾', 1.20, 20, 2),
('Salt 🧂', 1.60, 40, 2),
('Sugar 🍬', 1.60, 40, 2),
('Vanilla Extract 🍦', 3.50, 10, 2);

-- Cleaning products 🧻
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('All-purpose Cleaner 🧽', 3.00, 15, 3),
('Dish Soap 🧼', 2.50, 10, 3),
('Floor Cleaner 🧹', 3.50, 8, 3),
('Garbage Bags 🗑️', 1.50, 60, 3),
('Napkins 🧻', 0.20, 200, 3),
('Paper Towels 🧻', 2.00, 50, 3),
('Toilet Paper 🧻', 1.20, 100, 3),
('Disinfectant Spray 🧴', 4.00, 10, 3),
('Window Cleaner 🪟', 2.75, 12, 3);

-- Dairy products 🐮
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Butter 🧈', 2.25, 10, 4),
('Cheese 🧀', 3.00, 15, 4),
('Cottage Cheese 🧀', 3.20, 12, 4),
('Cream 🥛', 2.75, 15, 4),
('Heavy Cream 🧴', 3.80, 10, 4),
('Ice Cream 🍦', 4.00, 8, 4),
('Milk 🥛', 1.50, 20, 4),
('Whipped Cream 🥛', 2.50, 10, 4),
('Yogurt 🍨', 2.00, 25, 4);

-- Disposable products 🍽️
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Food Containers 🥡', 1.00, 50, 5),
('Knives 🔪', 0.35, 150, 5),
('Napkins 🧻', 0.20, 200, 5),
('Paper Cups 🥤', 0.25, 200, 5),
('Paper Plates 🍽️', 0.40, 100, 5),
('Plates 🍽️', 0.50, 100, 5),
('Plastic Cups 🥤', 0.30, 200, 5),
('Plastic Cutlery 🍴', 0.40, 150, 5),
('Spoons 🥄', 0.30, 150, 5),
('Straws 🥤', 0.10, 500, 5);

-- Fruits & Vegetables 🍎
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Apple 🍏', 1.20, 30, 6),
('Banana 🍌', 1.00, 50, 6),
('Broccoli 🥦', 2.25, 15, 6),
('Carrot 🥕', 0.90, 40, 6),
('Cucumber 🥒', 1.30, 30, 6),
('Lettuce 🥬', 2.00, 20, 6),
('Peach 🍑', 2.50, 20, 6),
('Pineapple 🍍', 3.00, 10, 6),
('Tomato 🍅', 1.50, 25, 6);

-- Meat products 🍖
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Beef Steak 🥩', 6.00, 8, 7),
('Bacon 🥓', 3.50, 20, 7),
('Chicken Breast 🍗', 4.50, 10, 7),
('Ground Beef 🍔', 5.25, 15, 7),
('Lamb Chops 🍖', 7.00, 5, 7),
('Sausages 🌭', 2.75, 25, 7),
('Turkey 🦃', 4.75, 10, 7),
('Pastrami 🥩', 6.00, 10, 7);

-- Snacks 🍫
INSERT INTO Products (name, price_per_item, min_quantity, catalog_id) 
VALUES 
('Bamba 🍟', 1.80, 20, 8),
('Chocolate Bar 🍫', 1.50, 30, 8),
('Cookies 🍪', 2.00, 25, 8),
('Gummy Bears 🍬', 1.20, 50, 8),
('Granola Bars 🍯', 2.30, 25, 8),
('Nuts 🥜', 2.50, 30, 8),
('Popcorn 🍿', 1.00, 50, 8),
('Potato Chips 🍟', 1.00, 40, 8),
('Pretzels 🥨', 1.80, 20, 8),
('Rice Cakes 🍚', 1.50, 30, 8);