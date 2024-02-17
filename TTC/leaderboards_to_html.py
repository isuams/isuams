'''
This code will read in the excel worksheet and split into separate dataframes based on each tab
It will then create an html table for each region which is used to plot on the website
'''

import pandas as pd
import numpy as np
from datetime import date, timedelta, datetime
import datetime

# Read in file and create dataframes for each tab in the spreadsheet
xls = pd.ExcelFile('/content/Final_Scores.xlsx')
df1 = pd.read_excel(xls, 'National')
df2 = pd.read_excel(xls, 'Stats')
df3 = pd.read_excel(xls, 'Southern Plains')
df4 = pd.read_excel(xls, 'Southeast')
df5 = pd.read_excel(xls, 'Midwest')
df6 = pd.read_excel(xls, 'Northern Plains')
df7 = pd.read_excel(xls, 'Mountain West')
df8 = pd.read_excel(xls, 'East')

# Loop through all dataframes and create html tables
dfs = [df1, df2, df3, df4, df5, df6, df7, df8]
regions = ['national', 'stats', 'southern_plains', 'southeast', 'midwest', 'northern_plains', 'mountain_west', 'east']

# Set options for html table
pd.set_option('colheader_justify', 'center')

# HTML code with DataTables search bar
html_template = """
<html>
<head>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>
</head>
<body>
"""

# Loop through each dataframe and create HTML file for each region
for df, region in zip(dfs, regions):
    # Add DataTables initialization
    html = html_template + """
    <script>
        $(document).ready(function() {
            $('#myTable').DataTable();
        });
    </script>
    """

    # Convert DataFrame to HTML table
    html += df.to_html(classes=['table', 'table-striped', 'table-hover'], header=True, float_format='{:10.2f}'.format, index=False, table_id='myTable')

    # Freeze the header
    html += '<style>'
    html += 'table.table > thead > tr:nth-child(1) > th{background: white;position: sticky;top:0;}'
    html += '</style>'

    # Change hover color
    html += '<style>'
    html += '.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {background-color: #c7eae5;}'
    html += '</style>'

    # Center text in table
    html += '<style>'
    html += 'td {text-align: center;}'
    html += '</style>'

    html += '</body></html>'

    # Write HTML to file
    with open(f"{region}.html", "w") as text_file:
        text_file.write(html)