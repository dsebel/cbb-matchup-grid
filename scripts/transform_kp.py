"""
Script used to transform pre-tournament KP data from raw CSV files.
"""

import argparse
import os
import pandas as pd


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Transform raw KP data')
    parser.add_argument('input_file', type=str, help='input csv file')
    args = parser.parse_args()
    input_file = args.input_file

    if os.path.exists(input_file) and not os.path.isdir(input_file):
        print('Transforming {}'.format(input_file))
        df = pd.read_csv(input_file)
        df = df[df['S'].notna()]  # drop non-tournament teams

        # TODO: Best way to do this?
        clean_df = pd.DataFrame()
        clean_df['Year'] = df['Year']
        clean_df['Rank'] = df['RankPythag']
        clean_df['Team'] = df['TeamName']
        clean_df['Seed'] = df['S'].astype(int)
        clean_df['Conf'] = ''
        clean_df['W-L'] = '0-0'
        clean_df['AdjEM'] = 0.00
        clean_df['AdjO'] = df['AdjOE']
        clean_df['AdjO Rank'] = df['RankAdjOE']
        clean_df['AdjD'] = df['AdjDE']
        clean_df['AdjD Rank'] = df['RankAdjDE']
        clean_df['AdjT'] = df['AdjTempo']
        clean_df['AdjT Rank'] = df['RankAdjTempo']
        clean_df['Luck'] = 0.0
        clean_df['Luck Rank'] = -1
        clean_df['SoS AdjEM'] = 0.0
        clean_df['SoS AdjEM Rank'] = -1
        clean_df['SoS OppO'] = 0.0
        clean_df['SoS OppO Rank'] = -1
        clean_df['SoS OppD'] = 0.0
        clean_df['SoS OppD Rank'] = -1
        clean_df['NCSoS AdjEM'] = 0.0
        clean_df['NCSoS AdjEM Rank'] = -1

        output_file_name = input_file[:-4] + ' - Clean.csv'
        clean_df.to_csv(output_file_name, index=False, line_terminator='\n')
    else:
        print('Invalid file provided: {}'.format(input_file))
