#!/bin/bash
bin_abs_path=$(readlink -f $(dirname $0))
pm2="/home/publish/tools/node_data/node_global/bin/pm2"
function restartPm2Script() {
	NAME="plushe-h5"
	${pm2} describe $NAME >/dev/null
	RUNNING=$?
	echo "RUNNING '$RUNNING'"
	if [ "${RUNNING}" -ne 0 ]; then
		cd ${bin_abs_path}/../
		npm run prod:pm2
		STATUS=$?
		echo "plushe-h5 status '$STATUS'..."
		exit $STATUS
	else
		${pm2} restart $NAME
		STATUS=$?
		echo "plushe-h5 status '$STATUS'..."
		exit $STATUS
	fi
}

restartPm2Script
