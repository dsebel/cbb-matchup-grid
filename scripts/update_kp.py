"""
Scrape main KenPom page to pull latest stats. Intended to be run periodically
on a one-time or weekly basis. Respect the robots.txt!

FIXME: Will require an update when seeds are released & added to team names.
"""

import math
import pandas as pd
import requests
from bs4 import BeautifulSoup

LOAD_LOCAL = True
URL = 'https://kenpom.com/'

if __name__ == '__main__':
    print('Retrieving KenPom ratings')

    # Load or retrieve HTML into soup.
    if LOAD_LOCAL:
        with open('tmp-output/tmp-kp.html', 'r') as html_file:
            soup = BeautifulSoup(html_file, 'lxml')
    else:
        soup = BeautifulSoup(requests.get(URL).content, 'lxml')
        with open('tmp-output/tmp-kp.html', 'w', encoding='utf-8') as html_file:
            html_file.write(str(soup))

    # Extract data from table rows.
    kp_rows = soup.find('table', {'id': 'ratings-table'}).find_all('tr')
    kp_ratings = []
    seed_gen = 0  # temporary until seeds are released
    for kp_row in kp_rows:
        kp_cols = kp_row.find_all(['td', 'th'])
        if len(kp_cols) == 8 or len(kp_cols) == 13:
            # skip header row
            continue
        elif len(kp_cols) != 21:
            raise Exception('Invalid number of columns!')
        team_name = ' '.join(list(filter(lambda x: x, kp_cols[1].text.replace('\n', '').split(' '))))
        kp_ratings.append([
            2020,
            int(kp_cols[0].text),
            team_name,
            int(math.floor(seed_gen / 4) + 1) if seed_gen < 64 else -1,  # seed
            kp_cols[2].text,
            kp_cols[3].text,
            float(kp_cols[4].text),  # adj em
            float(kp_cols[5].text),  # adj o
            int(kp_cols[6].text),
            float(kp_cols[7].text),  # adj d
            int(kp_cols[8].text),
            float(kp_cols[9].text),  # adj T
            int(kp_cols[10].text),
            float(kp_cols[11].text),  # luck
            int(kp_cols[12].text),
            float(kp_cols[13].text),  # SoS adj em
            int(kp_cols[14].text),
            float(kp_cols[15].text),  # SoS opp o
            int(kp_cols[16].text),
            float(kp_cols[17].text),  # SoS opp d
            int(kp_cols[18].text),
            float(kp_cols[19].text),  # NCSoS
            int(kp_cols[20].text),
        ])
        seed_gen += 1

    # Write to file.
    df = pd.DataFrame().from_records(kp_ratings)
    df.to_csv('tmp-output/tmp-kp.csv', header=False, index=False, line_terminator='\n')
