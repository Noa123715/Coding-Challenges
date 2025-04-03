import pandas as pd
import match_table

# Function to create family tree
def create_family_tree(df_match_table):
    """Creates a family tree from the match_table."""

    relations = []
    
    for _, row in df_match_table.iterrows():
        # Father-Child relations
        if pd.notna(row['Father_Id']):
            relations.append((row['Person_Id'], row['Father_Id'], 'Father'))
        
        # Mother-Child relations
        if pd.notna(row['Mother_Id']):
            relations.append((row['Person_Id'], row['Mother_Id'], 'Mother'))
        
        # Spouse relations
        if pd.notna(row['Spouse_Id']):
            relations.append((row['Person_Id'], row['Spouse_Id'], 'Spouse'))
            relations.append((row['Spouse_Id'], row['Person_Id'], 'Spouse'))
    
        # Sibling relations
        for _, row in df_match_table.iterrows():
            # Father side siblings
            father_siblings = df_match_table[df_match_table['Father_Id'] == row['Father_Id']]
            for _, sibling in father_siblings.iterrows():
                if sibling['Person_Id'] != row['Person_Id']:
                    if ('Sibling' not in [relation[2] for relation in relations if relation[0] == row['Person_Id'] and relation[1] == sibling['Person_Id']]):
                        relations.append((row['Person_Id'], sibling['Person_Id'], 'Sibling'))
            
            # Mother side siblings
            mother_siblings = df_match_table[df_match_table['Mother_Id'] == row['Mother_Id']]
            for _, sibling in mother_siblings.iterrows():
                if sibling['Person_Id'] != row['Person_Id']:
                    if ('Sibling' not in [relation[2] for relation in relations if relation[0] == row['Person_Id'] and relation[1] == sibling['Person_Id']]):
                        relations.append((row['Person_Id'], sibling['Person_Id'], 'Sibling'))

    # Convert the list of tuples to a DataFrame
    family_tree = pd.DataFrame(relations, columns=['Person_Id', 'Relative_Id', 'Connection_Type'])
    
    # Convert Person_Id and Relative_Id to integers
    family_tree['Person_Id'] = family_tree['Person_Id'].astype(int)
    family_tree['Relative_Id'] = family_tree['Relative_Id'].astype(int)
    
    return family_tree

# Function to complete the spouse data
def complete_spouse_data(df_match_table):
    """Completes the spouse data in the match_table."""

    # Make a copy of the dataframe to avoid modifying the original
    updated_df = df_match_table.copy()

    # Loop through each person and check if their spouse is defined
    for _, row in df_match_table.iterrows():
        if pd.notna(row['Spouse_Id']):
            spouse_id = row['Spouse_Id']
            # Check if the spouse has no Spouse_Id set and set it to the current person's ID
            if updated_df[updated_df['Person_Id'] == spouse_id]['Spouse_Id'].isna().any():
                updated_df.loc[updated_df['Person_Id'] == spouse_id, 'Spouse_Id'] = row['Person_Id']

    updated_df['Father_Id'] = updated_df['Father_Id'].astype('Int64')
    updated_df['Mother_Id'] = updated_df['Mother_Id'].astype('Int64')
    updated_df['Spouse_Id'] = updated_df['Spouse_Id'].astype('Int64')

    return updated_df

def main():

    # Creating a DataFrame with the data
    df_match_table = pd.DataFrame(match_table.match_table)
    # Creating the family tree
    family_tree = create_family_tree(df_match_table)
    # Update the match_table
    updated_df = complete_spouse_data(df_match_table)

    # print all answer
    print("Family Tree:")
    print(family_tree)
    print("Updated match_table:")
    print(updated_df)

if __name__ == "__main__":
    main()