------------------------------ add suppliers
-- 1
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'David', '058-320-8406', 'Angels', 2345, 1, 'Eitan');
-- 2
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Rina', '053-445-7890', 'Sugat', 3456, 2, 'Shira');
-- 3
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Moshe', '053-223-1188', 'Sano', 4567, 3, 'Lior');
-- 4
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Yael', '053-902-4567', 'Tnuva', 5678, 4, 'Michal');
-- 5
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Itay', '053-667-3344', 'Shamai', 6789, 5, 'Tomer');
-- 6
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Dana', '053-876-9901', 'Pri Hagalil', 7890, 6, 'Hila');
-- 7
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Tal', '053-111-2223', 'Mahfud', 9876, 7, 'Jonathan');
-- 8
INSERT INTO Users (user_type_id, username, phone_number, company_name, password, catalog_id, contact_person) VALUES (1, 'Amir', '053-543-6789', 'Osem', 8765, 8, 'Noy');

----------------------------------------- add orders
-- 1
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-08 09:23:11', 'in_progress', 0, 5);
-- 2
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-10 14:45:32', 'new', 0, 5);
-- 3
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-12 08:15:47', 'in_progress', 0, 5);
-- 4
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-14 19:02:58','new', 0, 5);
-- 5
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-16 11:38:25', 'completed', 0, 5);
-- 6
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-16 11:38:25', 'in_progress', 0, 8);
-- 7
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-27 07:49:21', 'completed', 0, 8);
-- 8
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-18 13:10:05', 'new', 0, 8);
-- 9
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-20 17:29:43', 'new', 0, 2);
-- 10
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-22 21:55:17', 'in_progress', 0, 2);
-- 11
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-25 10:12:39', 'completed', 0, 2);
-- 12
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-29 16:04:00', 'in_progress', 0, 3);
-- 13
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-03-31 18:33:42', 'completed', 0, 3);
-- 14
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-04-02 12:05:19', 'new', 0, 3);
-- 15
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-04-03 15:41:56', 'new', 0, 4);
-- 16
INSERT INTO Orders (date, status, sum, user_id) VALUES ('2025-04-05 20:17:08', 'completed', 0, 6);
------------------------------------- add order items
-- Order 1
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (1, 28, 10);  -- Butter 🧈
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (1, 29, 5);   -- Cheese 🧀
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (1, 30, 8);   -- Cottage Cheese 🧀
UPDATE Orders SET sum = (10 * 2.25 + 5 * 3.00 + 8 * 3.20) WHERE id = 1;
-- Order 2
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (2, 32, 12);  -- Heavy Cream 🧴
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (2, 33, 6);   -- Ice Cream 🍦
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (2, 34, 8);   -- Milk 🥛
UPDATE Orders SET sum = (12 * 3.80 + 6 * 4.00 + 8 * 1.50) WHERE id = 2;
-- Order 3
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (3, 35, 10);  -- Whipped Cream 🥛
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (3, 36, 5);   -- Yogurt 🍨
UPDATE Orders SET sum = (10 * 2.50 + 5 * 2.00) WHERE id = 3;
-- Order 4
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (4, 19, 15);  -- All-purpose Cleaner 🧽
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (4, 20, 10);  -- Dish Soap 🧼
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (4, 21, 7);   -- Floor Cleaner 🧹
UPDATE Orders SET sum = (15 * 3.00 + 10 * 2.50 + 7 * 3.50) WHERE id = 4;
-- Order 5
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (5, 22, 8);   -- Garbage Bags 🗑️
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (5, 23, 20);  -- Napkins 🧻
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (5, 24, 10);  -- Paper Towels 🧻
UPDATE Orders SET sum = (8 * 1.50 + 20 * 0.20 + 10 * 2.00) WHERE id = 5;
-- Order 6
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (6, 25, 5);   -- Toilet Paper 🧻
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (6, 26, 12);  -- Disinfectant Spray 🧴
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (6, 27, 20);  -- Window Cleaner 🪟
UPDATE Orders SET sum = (5 * 1.20 + 12 * 4.00 + 20 * 2.75) WHERE id = 6;
-- Order 7
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (7, 19, 10);  -- All-purpose Cleaner 🧽
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (7, 21, 7);   -- Floor Cleaner 🧹
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (7, 23, 12);  -- Paper Towels 🧻
UPDATE Orders SET sum = (10 * 3.00 + 7 * 3.50 + 12 * 2.00) WHERE id = 7;
-- Order 8
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (8, 20, 5);   -- Dish Soap 🧼
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (8, 22, 15);  -- Garbage Bags 🗑️
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (8, 24, 10);  -- Paper Towels 🧻
UPDATE Orders SET sum = (5 * 2.50 + 15 * 1.50 + 10 * 2.00) WHERE id = 8;
-- Order 9
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (9, 42, 20);  -- Beef Steak 🥩
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (9, 43, 10);  -- Bacon 🥓
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (9, 44, 15);  -- Chicken Breast 🍗
UPDATE Orders SET sum = (20 * 6.00 + 10 * 3.50 + 15 * 4.50) WHERE id = 9;
-- Order 10
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (10, 45, 5);   -- Ground Beef 🍔
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (10, 46, 10);  -- Lamb Chops 🍖
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (10, 47, 20);  -- Sausages 🌭
UPDATE Orders SET sum = (5 * 5.25 + 10 * 7.00 + 20 * 2.75) WHERE id = 10;
-- Order 11
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (11, 48, 12);  -- Turkey 🦃
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (11, 49, 8);   -- Pastrami 🥩
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (11, 50, 20);  -- Beef Steak 🥩
UPDATE Orders SET sum = (12 * 4.75 + 8 * 6.00 + 20 * 6.00) WHERE id = 11;
-- Order 12
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (12, 1, 10);   -- Baguette 🥖
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (12, 2, 5);    -- Chocolate Cake 🍫🎂
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (12, 3, 8);    -- Croissant 🥐
UPDATE Orders SET sum = (10 * 1.75 + 5 * 5.00 + 8 * 2.50) WHERE id = 12;
-- Order 13
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (13, 4, 12);   -- Donuts 🍩
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (13, 5, 7);    -- Muffins 🧁
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (13, 6, 10);   -- Pound Cake 🍰
UPDATE Orders SET sum = (12 * 1.50 + 7 * 3.00 + 10 * 4.00) WHERE id = 13;
-- Order 14
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (14, 7, 8);    -- Scones 🍪
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (14, 8, 6);    -- Tarts 🍰
UPDATE Orders SET sum = (8 * 2.80 + 6 * 3.50) WHERE id = 14;
-- Order 15
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (15, 9, 12);   -- Baking Powder 🍞
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (15, 10, 8);   -- Baking Soda 🧂
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (15, 11, 5);   -- Butter 🧈
UPDATE Orders SET sum = (12 * 1.00 + 8 * 0.80 + 5 * 2.00) WHERE id = 15;
-- Order 16
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (16, 28, 5);   -- Butter 🧈
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (16, 29, 15);  -- Cheese 🧀
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (16, 30, 8);   -- Cottage Cheese 🧀
UPDATE Orders SET sum = (5 * 2.25 + 15 * 3.00 + 8 * 3.20) WHERE id = 16;
-- Order 17
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (17, 32, 12);  -- Heavy Cream 🧴
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (17, 33, 6);   -- Ice Cream 🍦
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (17, 34, 8);   -- Milk 🥛
UPDATE Orders SET sum = (12 * 3.80 + 6 * 4.00 + 8 * 1.50) WHERE id = 17;
-- Order 18
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (18, 9, 10);   -- Baking Powder 🍞
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (18, 11, 5);   -- Butter 🧈
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (18, 14, 15);  -- Chocolate Chips 🍫
UPDATE Orders SET sum = (10 * 1.00 + 5 * 2.00 + 15 * 2.75) WHERE id = 18;
-- Order 19
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (19, 35, 8);   -- Whipped Cream 🥛
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (19, 36, 10);  -- Yogurt 🍨
INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (19, 37, 5);   -- Vanilla Extract 🍦
UPDATE Orders SET sum = (8 * 2.50 + 10 * 2.00 + 5 * 3.50) WHERE id = 19;