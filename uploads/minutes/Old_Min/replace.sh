#!/bin/sh

${oldheader} = '<div id="ams-main">\n<img src="../amslogo.jpg" ALT="Page Logo"><br>'
${newheader} = '<?php include("includes/subheader.php"); ?>'

for filename in *.htm*; do
    /bin/cp -f ${filename} ${filename}.old
    cat $filename  | sed -e 's/old string/new string/' > ${filename}.tmp
    /bin/mv -f ${filename}.tmp $filename
done