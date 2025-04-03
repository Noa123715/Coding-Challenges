import shutil
import constants
import os
import pandas as pd
import tempfile

def read_file(file_path):
    """Reads the input file, supporting both CSV and Parquet formats."""

    if file_path.endswith('.csv'):
        return pd.read_csv(file_path)
    elif file_path.endswith('.parquet'):
        return pd.read_parquet(file_path)
    else:
        raise ValueError("Unsupported file format. Please use CSV or Parquet.")

def validate_file(file):
    """Checks if the file is correct and ensures dates are consecutive."""

    # Check for empty file
    if file.empty:
        return "Error: The file is empty."

    # Check for required columns
    columns_names = {'timestamp', 'value'}
    if not columns_names.issubset(file.columns):
        return "Error: Missing required columns in the file."
    
    # Ensure timestamp is in datetime format
    file['timestamp'] = pd.to_datetime(file['timestamp'], errors='coerce', dayfirst=True)

    # Extract unique dates
    unique_dates = file['timestamp'].dt.date.unique()
    
    # Generate expected full date range from min to max
    all_days = pd.date_range(start=min(unique_dates), end=max(unique_dates), freq='D').date
    
    # Check if there are missing days
    missing_days = set(all_days) - set(unique_dates)
    if missing_days:
        return f"Error: Missing data for the following days: {sorted(missing_days)}"
    
    return "Valid"

def validate_row(row):
    """Validates a single row of the data."""
    try:
        # Validate timestamp format
        timestamp = pd.to_datetime(row['timestamp'], format="%Y-%m-%d %H:%M:%S", errors='coerce')
        if pd.isna(timestamp):
            return False
        
        # Validate value format (numeric)
        value = pd.to_numeric(row['value'], errors='coerce')
        if pd.isna(value):
            return False
        
        return True
    except Exception:
        return False

def calculate_hourly_average(file_path):
    """Calculates the hourly average of valid rows."""
    try:
        # Read the input file
        file = read_file(file_path)

        # Apply validation function without stopping execution
        file['is_valid'] = file.apply(validate_row, axis=1)
        valid_rows = file[file['is_valid']].drop(columns=['is_valid'])
        
        # Convert timestamp to datetime
        valid_rows['timestamp'] = pd.to_datetime(valid_rows['timestamp'], format="%Y-%m-%d %H:%M:%S", errors='coerce')
        
        # Round timestamp to the nearest hour
        valid_rows['hour'] = valid_rows['timestamp'].dt.floor('h')

        # Ensure 'value' column is numeric
        valid_rows['value'] = pd.to_numeric(valid_rows['value'], errors='coerce')

        # Compute hourly average
        answer_avg = valid_rows.groupby('hour')['value'].mean().reset_index()
        
        return answer_avg

    except Exception as e:
        return f"An error occurred: {str(e)}"

def split_file_by_day(file_path, split_folder, type='csv'):
    """Splits the input file into smaller files based on date."""
    try:
        # Read the input file
        file = read_file(file_path)
        
        # Ensure timestamp is in datetime format
        file['timestamp'] = pd.to_datetime(file['timestamp'], errors='coerce', dayfirst=True)
        
        # Add a column for the date (flooring the timestamp to day)
        file['date'] = file['timestamp'].dt.floor('D')
        
        # Create a directory for split files if it doesn't exist
        if not os.path.exists(split_folder):
            os.makedirs(split_folder)
        
        # Split the file by date and save each split as a separate file
        for date, group in file.groupby('date'):
            group.drop(columns=['date'], inplace=True)  # Remove the date column for the output file
            if type == 'csv':
                group.to_csv(f"{split_folder}/time_series_{date.date()}.csv", index=False)
            if type == 'parquet':
                group.to_parquet(f"{split_folder}/time_series_{date.date()}.parquet", index=False)
        
        print("File successfully split by date.")
    except Exception as e:
        return f"An error occurred: {str(e)}"

def process_and_combine_avg(split_folder, output_file):
    """Processes each split file, calculates hourly averages, and combines the results."""
    try:
        all_avg = []  # List to store all the hourly averages
        
        # Get a list of all csv split files
        split_files = [idx for idx in os.listdir(split_folder) if idx.endswith('.csv') or idx.endswith('.parquet')]
        
        # Process each split file
        for s_file in split_files:
            sf_path = os.path.join(split_folder, s_file)  # split file path
            # Calculate hourly averages for the current split file
            hourly_avg = calculate_hourly_average(sf_path)
            
            # Append the results to the list
            all_avg.append(hourly_avg)
        
        # Concatenate all the hourly averages from the split files
        combined_avg = pd.concat(all_avg)
        
        # Sort the combined data by the hour
        combined_avg = combined_avg.sort_values(by='hour')
        
        # Save the final combined result to a CSV file
        combined_avg.to_parquet(output_file, index=False)
        
        print(f"Hourly averages combined and saved to {output_file}.")
    except Exception as e:
        return f"An error occurred: {str(e)}"

    finally:
        # remove the tmp folder
        if os.path.exists(split_folder):
            shutil.rmtree(split_folder)
            print(f"The {split_folder} folder has been removed.")

def main():

    is_csv_valid = validate_file(read_file(constants.INPUT_CSV_FILE))
    is_parquet_valid = validate_file(read_file(constants.INPUT_PARQUET_FILE))

    if is_csv_valid == "Valid" and is_parquet_valid == "Valid":
        print("Both files are valid and will be processed")
        # split the 2 files
        split_file_by_day(constants.INPUT_CSV_FILE, constants.SPLIT_FOLDER, type='csv')
        split_file_by_day(constants.INPUT_PARQUET_FILE, constants.SPLIT_FOLDER, type='parquet')
    
        # Combine all the tmp file to the final response
        process_and_combine_avg(constants.SPLIT_FOLDER, constants.OUTPUT_FILE)

    if is_csv_valid == "Valid" and is_parquet_valid != "Valid":
        print("Only the csv file is valid and will be processed")
        split_file_by_day(constants.INPUT_CSV_FILE, constants.SPLIT_FOLDER, type='csv')
        process_and_combine_avg(constants.SPLIT_FOLDER, constants.OUTPUT_FILE)

    if is_parquet_valid == "Valid" and is_csv_valid != "Valid":
        print("Only the parquet file is valid and will be processed")
        split_file_by_day(constants.INPUT_PARQUET_FILE, constants.SPLIT_FOLDER, type='parquet')
        process_and_combine_avg(constants.SPLIT_FOLDER, constants.OUTPUT_FILE)

    if is_csv_valid != "Valid" and is_parquet_valid != "Valid":
        print("The files is not valid, please try again with valid files")

if __name__ == "__main__":
    main()
