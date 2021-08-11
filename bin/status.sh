#!/bin/bash

NAME="plushe-h5"
pm2="/home/publish/tools/node_data/node_global/bin/pm2"
${pm2} describe $NAME
RUNNING=$?
if [ "${RUNNING}" -eq 0 ]; then
    echo "RUNNING"
else
    echo "STOP"
fi
