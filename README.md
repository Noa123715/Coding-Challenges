# Coding Challenges - 🗃️
# Repository Overview
This repository provides a solution for a home assignment as part of the recruitment process. The exercise, and the solution, are structured in four parts with a bonus section.
The solution is designed to address the specific challenges presented in the assignment, offering an efficient and scalable approach
I made an effort in all parts to provide the most efficient solution I could implement, one that best meets the requirements, while maintaining order and organization so that the solution is clear to anyone reviewing it.
**Enjoy 😀**

***Repository Structure***

Each part has its own tag, and there is a final tag named: **`FINAL_VERSION`** that contains the complete solution

# Part A
The solution in this part is written in Python.
The `Part A` folder contains the following files:
- **logs.txt** - The file provided to us on which the operations are performed.
- **log_error_analysis.py** - Contains the solution for section A in Part A, which involves splitting the log.txt file into smaller parts and counting the frequency of each error code.
- **constants.py** - The constant data, such as file names and the number of lines in the smaller files

## Section A, Question 5

### **Time and Space Complexity Analysis**

To analyze the time and space complexity of the solution, we will go through each function in the code and examine the complexity of each. We assume the worst-case scenario for all calculations.

#### 1. **Function `split_log_file`**
This function is responsible for splitting a large log file into smaller files, each containing up to `LINES_PER_FILE` lines.
- **Time Complexity**: For each line in the log file, the function reads it and writes it to a new file. In the worst case, each line needs to be read and written once, so the time complexity is **O(M)**, where `M` is the number of lines in the log file.
- **Space Complexity**: The function processes the file line by line without storing large portions in memory at once. Therefore, the space complexity is **O(1)**.

#### 2. **Function `count_errors_in_file`**
This function reads each line from the log file and counts the occurrences of each error code.
- **Time Complexity**: The function iterates over each line in the file and updates the error count (using a `Counter` data structure, which operates in O(1) per update). Therefore, the time complexity is **O(L)**, where `L` is the number of lines in the file.
- **Space Complexity**: The function stores the error counts in a `Counter` data structure. In the worst case, each error is unique, so we need to store up to **O(L)** unique error codes.

#### 3. **Function `process_log_parts`**
This function reads all the split log files and performs error counting for each file.
- **Time Complexity**: For each file, the function reads all the lines and counts the errors. If there are `P` files, the total time complexity is **O(L)**, where `L` is the total number of lines in the original log file.
- **Space Complexity**: The function stores the error counts for each file separately, so the space complexity for each file is **O(U)**, where `U` is the number of unique errors in the file. Across all files, the required space is **O(P * U)** in the worst case.

#### 4. **Function `merge_error_counts`**
This function merges the error counts from different temporary files and sorts the errors by frequency.
- **Time Complexity**: The function reads data from all the temporary files and sums the errors, then sorts the counts. The data reading time is **O(U)**, where `U` is the number of unique errors across all files. Then, sorting the errors takes **O(N log N)**, where `N` is the number of unique errors. Therefore, the total time complexity is **O(U + N log N)**.
- **Space Complexity**: The function stores the total error counts in a `Counter` data structure. In the worst case, if all errors are unique, the space complexity is **O(N)**.

#### 5. **Function `get_top_n_errors`**
The function extracts the top `N` most common error codes from the merged error count file.

- **Time Complexity**:
  - Opening the file – **O(1)**.
  - Reading lines from the file – In the worst case, if `N` is large, the function reads all `M` lines from the file, making this step **O(M)**.
  - Appending lines to a list – Since appending takes **O(1)**, this contributes at most **O(N)**, so the total time complexity is: **O(M)**.
- **Space Complexity**: The list `top_errors` stores at most `N` lines, requiring **O(N)** space. Other variables (such as file handles and loop counters) use **O(1)** space. The final space complexity: **O(N)**.

#### 6. **Function `main`**
This function ties all the steps together and performs all the operations described.
The overall complexity of the `main` function is the sum of the complexities of the different functions, so the total time complexity is **O(L + U + N log N)**, where `L` is the number of lines in the log file, `U` is the number of unique errors, and `N` is the number of unique errors in the final result.

### **Final Answer**
- **Total Time Complexity**:  
  Since merging results and counting errors for a relatively limited number of unique errors contributes less to the total complexity, the overall final time complexity is: **O(N log N)**, where `N` is the number of most common error codes we need to extract from the log file as specified in the input.

- **Total Space Complexity**:  
  The final overall space complexity is: **O(N)**, where `N` is the number of most common error codes stored in the output list.

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
  
- **Exponential Moving Average (EMA)**: This technique gives more weight to recent data by applying an exponentially decaying weight to older data points. This is especially useful when recent data is considered more important for future predictions.

- **Efficient Data Structures**: To manage the data efficiently in real-time, you can use data structures that allow fast addition and removal of data points. This ensures that the average can be updated quickly without introducing delays.

4. **Implementation Considerations**

- **Memory Management**: Since you are working with streaming data, it's important not to store large amounts of data in memory. Techniques like sliding windows and EMA allow you to store only the necessary data for calculating the averages without needing to keep the entire dataset.
  
- **Latency**: The system should be designed to process the data and update the averages with minimal latency, ensuring that the data is always as up-to-date as possible.

5. **Example Setup**
A simple way to implement streaming data processing is by using frameworks that are designed for this purpose, allowing you to read data from streams in real-time and process it as it arrives. By setting up a data processing pipeline, you can compute averages as the data flows in and update the statistics in real time.

## Section B, Question 4

***Why Use Parquet Instead of CSV?***

Parquet is a highly efficient, columnar storage format that outperforms CSV in data handling. Here’s why:

- 🚀 **Faster Processing** – Reads only required columns, reducing load times.
- 📉 **Smaller File Size** – Built-in compression minimizes storage needs.
- 🔥 **Optimized for Big Data** – Works seamlessly with cloud storage & analytics frameworks.
- 🛡️ **Preserves Data Types** – Unlike CSV, it retains correct data types, avoiding conversion issues.

🔹 _Parquet is the preferred choice for scalable, high-performance data processing._
