#!/usr/bin/bash
pip3 install -r requirments.txt
sudo mysql -u root < setup_mysql.sql
cd backend
python3 -m api.v1.app &
cd ..
cd frontend
npm install
npm run dev &
wait
