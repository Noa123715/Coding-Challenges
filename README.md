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