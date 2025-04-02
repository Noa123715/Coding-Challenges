import os
from collections import Counter
import constants

def split_log_file(INPUT_FILE, output_folder, LINES_PER_FILE):
    """Splits a large log file into multiple smaller files, each containing a fixed number of lines."""

    # create output directory
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # split log file
    with open(INPUT_FILE, 'r', encoding='utf-8') as infile:
        file_count = 0
        while True:
            OUTPUT_FILE = os.path.join(output_folder, f'log_part_{file_count}.txt')
            
            # Read up to LINES_PER_FILE lines
            lines = [infile.readline() for _ in range(LINES_PER_FILE)]
            
            # If there are no more lines to read, stop
            if not any(lines):  # checks if all lines are empty, i.e., end of file
                return
            
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
                for line in lines:
                    if line:  # write non-empty lines
                        outfile.write(line)
            
            file_count += 1  # increment the counter for the next file

def count_errors_in_file(file_path, output_folder, part_index):
    """Counts the occurrences of each error code in a single log file and saves the count in a separate file."""

    error_counts = Counter()
    
    with open(file_path, 'r', encoding='utf-8') as infile:
        for line in infile:
            error_code = line.strip()
            error_counts[error_code] += 1
    
    # save the results in a permanent file
    OUTPUT_FILE = os.path.join(output_folder, f'ERROR_COUNTS_PART_{part_index}.txt')
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        for error_code, count in error_counts.items():
            outfile.write(f"{error_code};{count}\n")

def process_log_parts(SPLIT_FOLDER, TEMP_COUNTS_FOLDER):
    """Iterates through all split log files and counts the error codes in each one."""

    part_index = 0
    for filename in os.listdir(SPLIT_FOLDER):
        if filename.startswith("log_part_") and filename.endswith(".txt"):
            file_path = os.path.join(SPLIT_FOLDER, filename)
            count_errors_in_file(file_path, TEMP_COUNTS_FOLDER, part_index)
            part_index += 1

def merge_error_counts(input_folder, OUTPUT_FILE):
    """Merges the error count results from all temporary files into a single output file, sorted by frequency."""

    total_error_counts = Counter()
    
    for filename in os.listdir(input_folder):
        if filename.startswith("ERROR_COUNTS_PART_") and filename.endswith(".txt"):
            file_path = os.path.join(input_folder, filename)
            with open(file_path, 'r', encoding='utf-8') as infile:
                for line in infile:
                    error_code, count = line.strip().split(";")
                    total_error_counts[error_code] += int(count)
    
    # save the results in the order of the most common errors
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        for error_code, count in total_error_counts.most_common():
            outfile.write(f"{error_code}: {count}\n")

def get_top_n_errors(output_file, N):
    """Returns the top N most common error codes from the merged error count file."""
    
    top_errors = []
    
    with open(output_file, 'r', encoding='utf-8') as infile:
        for line in infile:
            if len(top_errors) >= N:
                break
            top_errors.append(line.strip())
    
    return top_errors

def main():
    # get user input
    input_file = input("Enter the log file name: ").strip()
    N = int(input("Enter the number of top error codes to display: ").strip())

    # create output directories
    os.makedirs(constants.SPLIT_FOLDER, exist_ok=True)
    os.makedirs(constants.TEMP_COUNTS_FOLDER, exist_ok=True)
    
    # split the log big file
    split_log_file(constants.INPUT_FILE, constants.SPLIT_FOLDER, constants.LINES_PER_FILE)

    # count the errors in each file
    process_log_parts(constants.SPLIT_FOLDER, constants.TEMP_COUNTS_FOLDER)

    # merge the error counts from multiple files to a single file
    merge_error_counts(constants.TEMP_COUNTS_FOLDER, constants.OUTPUT_FILE)

    # get the top N error codes
    top_errors = get_top_n_errors(constants.OUTPUT_FILE, N)

    # print the top N error codes to the user
    print("\nTop", N, "error codes:")
    for error in top_errors:
        print(error)

if __name__ == "__main__":
    main()
