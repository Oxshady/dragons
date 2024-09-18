#!/usr/bin/bash
echo '{
    "web": {
        "client_id": "492815053989-css65qnm2e4r9k4ek3s3qndl2fk15r3t.apps.googleusercontent.com",
        "project_id": "movie-magic-ai",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "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",
        "redirect_uris": [
            "http://localhost:5000/login/google/authorized"
        ]
    }
}'> ./backend/api/v1/.client_secret.json
echo "MYSQL_USER=$1" >> ./backend/.env
echo "MYSQL_PWD=$2" >> ./backend/.env
pip3 install -r requirments.txt
echo "enter your mysql password again to setup the database"
sudo mysql -u $1 -p < setup_mysql.sql
cd backend
python3 -m api.v1.app &
cd ..
cd frontend
npm install
npm run dev &
wait
