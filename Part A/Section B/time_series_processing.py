import constants
import pandas as pd
import os

def validate_file(file):
    """Checks if the file is correct and ensures dates are consecutive."""

    # Check for empty file
    if file.empty:
        return "Error: The file is empty."

    # Check for required columns
    columns_names = {'timestamp', 'value'}
    if not columns_names.issubset(file.columns):
        return "Error: Missing required columns in the CSV file."
    
    # Assuming the file is invalid: contains duplicates
    # if file.duplicated(subset=['timestamp', 'value']).any():
    #     return "Error: Duplicate (timestamp, value) pairs found in the CSV file."
    
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
        # Read the CSV file
        file = pd.read_csv(file_path)

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

def split_file_by_day(file_path, split_folder):
    """Splits the input CSV file into smaller files based on date."""
    try:
        # Read the CSV file
        file = pd.read_csv(file_path)
        
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
            group.to_csv(f"{split_folder}/time_series_{date.date()}.csv", index=False)
            
        return "File successfully split by date."
    except Exception as e:
        return f"An error occurred: {str(e)}"

def process_and_combine_avg(split_folder, output_file):
    """Processes each split file, calculates hourly averages, and combines the results."""
    try:
        all_avg = [] # List to store all the hourly averages
        
        # Get a list of all split files
        split_files = [idx for idx in os.listdir(split_folder) if idx.endswith('.csv')]
        
        # Process each split file
        for s_file in split_files:
            sf_path = os.path.join(split_folder, s_file) # split file path
            # Calculate hourly averages for the current split file
            hourly_avg = calculate_hourly_average(sf_path)  # Using your existing function
            
            # Append the results to the list
            all_avg.append(hourly_avg)
        
        # Concatenate all the hourly averages from the split files
        combined_avg = pd.concat(all_avg)
        
        # Sort the combined data by the hour
        combined_avg = combined_avg.sort_values(by='hour')
        
        # Save the final combined result to a CSV file
        combined_avg.to_csv(output_file, index=False)
        
        return f"Hourly averages combined and saved to {output_file}."
    except Exception as e:
        return f"An error occurred: {str(e)}"

def main():

    # Validate the input file
    is_valid = validate_file(pd.read_csv(constants.INPUT_FILE))
    print(is_valid)
    if is_valid == "Valid":
        # Split the file by date
        split_status = split_file_by_day(constants.INPUT_FILE, constants.SPLIT_FOLDER)
        print(split_status)
        
        # Process the split files and combine the hourly averages
        combine_status = process_and_combine_avg(constants.SPLIT_FOLDER, constants.OUTPUT_FILE)
        print(combine_status)
    else:
        print("The file is invalid. Please provide a valid CSV file.")

if __name__ == "__main__":
    main()