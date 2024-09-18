#!/usr/bin/bash
echo "MYSQL_USER=$1" >> ./backend/.env
echo "MYSQL_PWD=$2" >> ./backend/.env
pip3 install -r requirments.txt
sudo mysql -u $1 -p < setup_mysql.sql
cd backend
python3 -m api.v1.app &
cd ..
cd frontend
npm install
npm run dev &
wait
