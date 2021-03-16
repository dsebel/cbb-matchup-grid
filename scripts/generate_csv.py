"""
Scrape main KenPom page to pull latest stats. Intended to be run periodically
on a one-time or weekly basis. Respect the robots.txt!
"""

import os
import pandas as pd
import requests
from bs4 import BeautifulSoup

SITE_URL = 'https://kenpom.com/'
CURRENT_YEAR = 2021


def get_soup(url):
    file_path = os.path.join('.', 'tmp_data', 'tmp-kp.html')
    if os.path.exists(file_path):
        print('Loading HTML from local file')
        with open(file_path, 'r') as file_handle:
            soup = BeautifulSoup(file_handle, 'lxml')
    else:
        print('Scraping HTML from website')
        soup = BeautifulSoup(requests.get(url).content, 'lxml')
        print('Writing HTML to local file')
        with open('data/tmp-kp.html', 'w', encoding='utf-8') as html_file:
            html_file.write(str(soup))
    return soup


def extract_columns(html_row):
    html_cols = html_row.find_all(['td', 'th'])

    # Skip header cols.
    if len(html_cols) == 8 or len(html_cols) == 13:
        return None

    # Extract team name and seed (if it exists).
    team_name_html = html_cols[1]
    span_html = team_name_html.find('span', {'class': 'seed'})
    seed = -1
    if span_html is not None:
        seed = int(span_html.extract().text)
    team_name = team_name_html.text.strip()

    return {
        'year': CURRENT_YEAR,
        'rank': int(html_cols[0].text),
        'team_name': team_name,
        'seed': seed,
        'conference': html_cols[2].text,
        'record': html_cols[3].text,
        'adj_em': float(html_cols[4].text),
        'adj_o': float(html_cols[5].text),
        'adj_o_rank': int(html_cols[6].text),
        'adj_d': float(html_cols[7].text),
        'adj_d_rank': int(html_cols[8].text),
        'adj_t': float(html_cols[9].text),
        'adj_t_rank': int(html_cols[10].text),
        'luck': float(html_cols[11].text),
        'luck_rank': int(html_cols[12].text),
        'sos_adj_em': float(html_cols[13].text),
        'sos_adj_em_rank': int(html_cols[14].text),
        'sos_opp_o': float(html_cols[15].text),
        'sos_opp_o_rank': int(html_cols[16].text),
        'sos_opp_d': float(html_cols[17].text),
        'sos_opp_d_rank': int(html_cols[18].text),
        'ncsos_adj_em': float(html_cols[19].text),
        'ncsos_adj_em_rank': int(html_cols[20].text),
    }


def extract_table(soup):
    kp_data = []
    html_rows = soup.find('table', {'id': 'ratings-table'}).find_all('tr')
    for html_row in html_rows:
        data_record = extract_columns(html_row)
        if data_record is not None and data_record['seed'] != -1:
            kp_data.append(data_record)
    return kp_data


def main():
    soup = get_soup(SITE_URL)
    data = extract_table(soup)
    df = pd.DataFrame().from_records(data)
    csv_file = os.path.join('.', 'tmp_data', 'tmp-kp.csv')
    df.to_csv(csv_file, index=False, line_terminator='\n')


if __name__ == '__main__':
    print('Starting...')
    main()
    print('Finished!')
