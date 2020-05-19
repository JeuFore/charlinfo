#!/bin/bash

echo -e "\n\nSynchronisation du serveur\n\n"

ssh jeufore@78.47.196.197 './server_script.sh charlinfo'

echo -e "\n\nSynchronisation effectuée :)\n\n"