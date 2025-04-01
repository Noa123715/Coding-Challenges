import os

# split_log_file('logs.txt', 'logs_split', lines_per_file=100000)
def split_log_file(input_file, output_dir, lines_per_file):
    """Split a log file into multiple files with less number of lines per file."""

    # create output directory
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # split log file
    with open(input_file, 'r', encoding='utf-8') as infile:
        file_count = 0
        while True:
            output_file = os.path.join(output_dir, f'log_part_{file_count}.txt')
            with open(output_file, 'w', encoding='utf-8') as outfile:
                for _ in range(lines_per_file):
                    line = infile.readline()
                    if not line:
                        return
                    outfile.write(line)
            file_count += 1

