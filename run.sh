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

PID=$(sudo lsof -t -i :5000)
# Check if a PID was found on port 5000
if [ -n "$PID" ]; then
  echo "Killing process with PID $PID on port 5000"
  sudo kill -9 $PID
else
  echo "No process is using port 5000"
fi

PID=$(sudo lsof -t -i :5173)

# Check if a PID was found on port 5173
if [ -n "$PID" ]; then
  echo "Killing process with PID $PID on port 5173"
  sudo kill -9 $PID
else
  echo "No process is using port 5173"
fi

pip3 install -r requirments.txt
cd backend
python3 -m api.v1.app &
cd ..
cd frontend
npm install
npm run dev &
wait
