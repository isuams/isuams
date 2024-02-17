'''
script will read in the spreadsheet for today's forecast and turn into an html table
'''

import pandas as pd
import numpy as np
from datetime import date, timedelta, datetime
import datetime

df = pd.read_excel('/content/2023_06_15_10_.xlsx')

# Set options for html table
pd.set_option('colheader_justify', 'center')

# HTML code with DataTables search bar
html = """
<html>
<head>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>
</head>
<body>
"""

# Add DataTables initialization
html += """
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

text_file = open("2023_06_15_table.html", "w")
text_file.write(html)
text_file.close()