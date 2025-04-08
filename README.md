# הגשת מבחן בית-הדסים 5.0
# Coding Challenges - 🗃️
# Repository Overview
This repository provides a solution for a home assignment as part of the recruitment process. The exercise, and the solution, are structured in four parts with a bonus section.
The solution is designed to address the specific challenges presented in the assignment, offering an efficient and scalable approach
I made an effort in all parts to provide the most efficient solution I could implement, one that best meets the requirements, while maintaining order and organization so that the solution is clear to anyone reviewing it.
**Enjoy 😀**

***Repository Structure***

Each part has its own Branch, and there is a final tag named: **`FINAL_VERSION`** that contains the complete solution

# Part A
The solution in this part is written in Python.
The `Part A` folder contains the following folder:

1. **Section A**
  - **logs.txt** - The file provided to us on which the operations are performed.
  - **log_error_analysis.py** - Contains the solution for section A in Part A, which involves splitting the log.txt file into smaller parts and counting the frequency of each error code.
  - **constants.py** - The constant data, such as file names and the number of lines in the smaller files

2. **Section B**
  - **time_series.csv** - Contains two columns: [ Timestamps, Value ] in csv format
  - **time_series.parquet** - Contains two columns: [ Timestamps, Value ] in parquet format
  - **time_series_processing.py** - Contains the solution for section B in Part A, which involves splitting the files into smaller parts and calculate the hourly average
  - **constants.py** - The constant data, such as file names and folder name

## Section A, Question 5

## **Time and Space Complexity Analysis**

_Runtime complexity:_
- The complexity is calculated on the main function that calls all other functions.
All functions run one after the other, meaning there are no nested functions, and therefore all functions (except the merge_error_counts function) have a runtime of \(O(M)\) where \(M\) is the number of lines in the original file.
- The merge_error_counts function counts the frequency of errors from all small files and therefore runs in \(O(M)\) where \(M\) is the number of unique errors.
- Since \(M\) is negligible compared to \(O(MlogM)\), the final result will be \(O(MlogM)\).

**_final answer: \(O(MlogM)\)_**

_Place complexity:_
The code divides the large file into small files, and calculates the frequency of each error for each small file (saved in a file) and then writes the frequencies of all files to the final file
In the worst case, the number of lines in the original file will be the same as the number of unique errors
Therefore, the space complexity is \(O(M)\) for the large and final file, and \(O(E * T)\) for the small files.
Where \(M\) is the number of lines in the original file and the number of unique errors in the final file
\(T\) is the number of small files created
\(E\) is the number of unique errors
Since \(O(M)\) is negligible compared to \(O(E * T)\), the final complexity will be \(O(E * T)\)

**_final answer: \(O(E * T)\)_**

## Section B, Question 3

**Handling Streaming Data and Updating Averages**

When working with streaming data, it’s important to design a system that can process the data as it arrives and update statistics such as averages without storing the entire dataset in memory. Here’s how you can approach this problem:

1. **Data Ingestion**
First, you need to set up a system that can handle incoming data streams. This can be done using various technologies that allow for continuous and real-time data ingestion, such as direct connections to data streams or other protocols suitable for your needs.

2. **Real-Time Processing**
Once the data is flowing, you need a processing system that can handle it efficiently. There are frameworks designed for real-time data processing that can process data in small batches or handle individual data points as they arrive.

3. **Updating Averages**
When updating averages, there are several strategies you can use depending on the size of the data and how quickly it needs to be processed:

- **Sliding Window Average**: In this approach, you maintain a fixed-size window of the most recent data points. As new data comes in, it is added to the window, and the oldest data point is removed. This way, the average always reflects the most recent data within the window.
  
- **Exponential Moving Average**: This technique gives more weight to recent data by applying an exponentially decaying weight to older data points. This is especially useful when recent data is considered more important for future predictions.

- **Efficient Data Structures**: To manage the data efficiently in real-time, you can use data structures that allow fast addition and removal of data points. This ensures that the average can be updated quickly without introducing delays.

4. **Implementation Considerations**

- **Memory Management**: Since you are working with streaming data, it's important not to store large amounts of data in memory. Techniques like sliding windows and EMA allow you to store only the necessary data for calculating the averages without needing to keep the entire dataset.
  
- **Latency**: The system should be designed to process the data and update the averages with minimal latency, ensuring that the data is always as up-to-date as possible.

5. **Example Setup**
A simple way to implement streaming data processing is by using frameworks that are designed for this purpose, allowing you to read data from streams in real-time and process it as it arrives. By setting up a data processing pipeline, you can compute averages as the data flows in and update the statistics in real time.

## Section B, Question 4

**Why Use Parquet Instead of CSV?**

Parquet is a highly efficient, columnar storage format that outperforms CSV in data handling. Here’s why:

- **Faster Processing** – Reads only required columns, reducing load times.
- **Smaller File Size** – Built-in compression minimizes storage needs.
- **Optimized for Big Data** – Works seamlessly with cloud storage & analytics frameworks.
- **Preserves Data Types** – Unlike CSV, it retains correct data types, avoiding conversion issues.

**_Parquet is the preferred choice for scalable, high-performance data processing._**

# Part B
The solution in this part is written in Python.
The `Part B` folder contains the following files:

- **family_tree.py** - The file extracts the family tree according to the table of relationships and corrects the table if necessary.
- **match_table.py** - The file contains the table with the family relationships.

# Part C
1. **Interest in Hardware/Electronics Roles**
  4 - Quite Interested

2. **How Does an Air Conditioner Remote Control Work?**
  _Most of the information provided here is sourced from Wikipedia: [Wikipedia Link](https://en.wikipedia.org/wiki/Remote_control)_

  a. **Transmission Method**
  There are several methods for the remote control communicates with the air conditioner:

  - *[Infrared](https://davidson.weizmann.ac.il/online/scienceathome/biology/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%A2%D7%9C-%D7%A9%D7%9C%D7%98-%D7%90%D7%95%D7%A8-%D7%90%D7%99%D7%A0%D7%A4%D7%A8%D7%94-%D7%90%D7%93%D7%95%D7%9D)* – The most common method, using light signals in the infrared spectrum.
  - *Radio Frequency* – Used in some advanced models, allowing non-line-of-sight operation.
  - *Bluetooth/Wi-Fi* – Found in smart AC systems, enabling remote control via mobile applications.

  b. **Required Components**
  - Remote Control Side:
    * Microcontroller (to encode signals)
    * IR LED / RF transmitter (to send signals)
    * Buttons (to select commands)
    * Power source (batteries)

    - Air Conditioner Side:
    * IR sensor / RF receiver (to receive signals)
    * Microcontroller (to decode signals)
    * Control circuit (to process commands and operate the AC)

  c. **Identifying Button Presses**
  Several methods can be used to represent different button presses:
    
  - *Fixed Unique Codes* – Each button press is associated with a predefined unique binary code.
  - *Pulse Width Modulation* – The duration of pulses varies to indicate different commands.
  - *Frequency Modulation* – Different signals are sent at slightly varied frequencies for each button.
  - *Protocol-Based Encoding* – Common IR remote control standards use structured data packets with unique identifiers for each button.

# Part D

## SuperMarket Management System
### Application Overview
This project is an inventory and order management system developed for a local grocery store.  
It provides two interfaces:
- A **Supplier Portal** for suppliers to register, view incoming orders from the grocery store, and confirm them.
- A **Grocery Owner Portal** where the store owner can place orders, track their statuses, and confirm deliveries.

### Setup and Installation
To run the application locally, follow these steps:

- Open your Command Line. 
  for Windows: (1. Press `WinKey` + `R`, 2. Type `cmd`, 3. Press `Enter`)
  for Mac: (1. Press `Command (⌘)` + `Space`, 2. Type `cmd`, 3. Press `Enter`)

- Clone the repository from GitHub:
    ```bash
    git clone https://github.com/Noa123715/Coding-Challenges.git
    ```

- Install dependencies for both the client and server:

    ```bash
    cd client
    ```

    ```bash
    npm install
    ```

    ```bash
    cd ../server
    ```

    ```bash 
    npm install
    ```
- Start the backend server:

    ```bash
    node index.js &
    ```

- Start the frontend application:

    ```bash
    cd ../client
    ```

    ```bash
    npm start &
    ```

- If the browser does not open automatically, navigate to `http://localhost:3000` to view the application.

To the DataBase you need to have mySql on the computer...
- You can download the Server from the following link: [mySql Server 8.0](https://dev.mysql.com/downloads/mysql/8.0.html)
- You can download the Workbanch from the following link: [mySql WorkBanch](https://dev.mysql.com/downloads/workbench/)

Then you can run the scripts in the folder database -> Finally you have the DB ready.

### Usage Instructions

**Suppliers**

- Can register by providing company name, phone number, representative name, and a list of products they offer.
- Can log in to view orders placed by the grocery store.
- Can confirm an order, which will move its status to "In Progress".

**Grocery Store Owner**

- Can place orders from registered suppliers.
- Can view the status of all current and past orders.
- Can confirm the receipt of an order, changing its status to "Completed", and the supplier will be notified.

### API Endpoints

**Users:**

- LogIn:
  ```bash
  GET /api/users/username/:username/password/:password
  ```
- SignUp
  ```bash
  POST /api/users/newUser
  ```
- Get all Supplier
  ```bash
  GET /api/users/getSuppliers
  ```
**Catalogs:**

- Get All Catalos for SignUp
  ```bash
  GET /api/catalogs
  ```
- Get All Products From the Catalog
  ```bash
  GET /api/catalogs/getAllProducts/user_id/:user_id
  ```
**Orders:**

- Get All order for the Supplier
  ```bash
  GET /api/orders/user_id/:user_id
  ```
- Update a status of an Order
  ```bash
  PUT /api/orders/valid
  ```
- Get Order Details
  ```bash
  GET /api/orders/orderDetails/user_id/:user_id/order_id/:order_id
  ```
- Get All the Order Items of an Order
  ```bash
  GET /api/orders/orderProducts/order_id/:order_id
  ```
- Get All the Orders for the Store Owner
  ```bash
  GET /api/orders/store_owner
  ```
- Add a New Order
  ```bash
  POST /api/orders/addNewOrder/user_id/:user_id
  ```

### DataBase Structure

**UserTypes**
- type_id: `INT AUTO_INCREMENT -> PRIMARY KEY`
- type_name: `VARCHAR(50)`

**Catalogs**
- catalog_id: `INT AUTO_INCREMENT -> PRIMARY KEY`
- catalog_name: `VARCHAR(50)`

**Products**
- product_id: `INT AUTO_INCREMENT -> PRIMARY KEY`
- name: `VARCHAR(50)`
- price_per_item: `DECIMAL(10,2)`
- min_quantity: `INT`
- catalog_id: `INT -> FOREIGN KEY`

**Users**
- user_id: `INT AUTO_INCREMENT -> PRIMARY KEY`
- user_type_id: `INT -> FOREIGN KEY`
- username: `VARCHAR(50)`
- company_name: `VARCHAR(50)`
- phone_number: `VARCHAR(50)`
- contact_person: `VARCHAR(50)` -> will be null for the store-owner
- catalog_id: `VARCHAR(50)` -> will be null for the store-owner
- password: `INT`

**Orders**
- id: `INT AUTO_INCREMENT -> PRIMARY KEY`
- status: `ENUM('new', 'in_progress', 'completed')`
- date: `DATETIME`
- sum: `FLOAT`
- user_id: `INT -> FOREIGN KEY`

**Order_Items**
- order_id: `INT -> FOREIGN KEY`
- product_id: `INT -> FOREIGN KEY`
- quantity: `INT`

### Assumptions

- The system is designed for one grocery store owner only. No multi-owner support is implemented.
- No updates are allowed to users, products, or orders after their creation. Data is considered immutable post-creation.
- Product list per supplier is fixed upon registration.

### Screenshots

- Entering the website:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/LogIn.png"> <br><br>
- New User for the Application:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/SignUp.png"> <br><br>
- Orders List:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/OrderList.png"> <br><br>
- Order Details:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/OrderDetails.png"> <br><br>
- New Order for the Store Owner:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/NewOrder.png"> <br><br>

# Bonus

### OverView

This add-on is designed to help the store owner manage their inventory efficiently. It includes a comprehensive database of all the merchandise in the store and integrates with the point of sale system via API. The store owner defines a minimum inventory for each item, and when the inventory drops below this threshold, the system automatically places an order with the supplier offering the best price. If there is no doubt that this product is available, the store owner is notified.
There is a point of sale where the store owner makes the customer's purchase and the server updates the inventory accordingly. If the customer took a quantity of a product that is not in stock, he receives a notification that the product was not included in the purchase.

***Dictionary:*** *POS: Point Of Sales*

### Usage instructions

The store owner logs in with his user and has the option to proceed to the POS.
There he simply enters the quantity of each product the customer bought and clicks on complete purchase.
Everything else is done automatically...

### API Endpoint
- Get All Products to do the client order
  ```bash
  GET /api/sales/getProducts
  ```
- Automating ordering products from suppliers and updating inventory
  ```bash
  POST /api/sales/endPurchase
  ```

### DataBase

**Invemtory**
- product_id: `INT -> FOREIGN KEY`
- quantity: `INT`
- min_quantity: `INT`

### Screenshot

- The Point Of Sales: Chashier:
  <img src="https://github.com/noa123715/Coding-Challenges/raw/main/Part%20D/screenshots/POS.png">


#### The application was developed by Noa Abecassis in Avril 2025. This is the first version of the application.

#### I hope you enjoy using my application and that it proves to be helpful to many people.

# Enjoyable Use 😊
