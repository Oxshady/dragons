#!/usr/bin/bash
pip3 install -r requirments.txt
cd backend
python3 -m api.v1.app &
cd ..
cd frontend
npm install
npm run dev &
wait