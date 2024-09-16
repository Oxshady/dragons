from models import db
from flask import jsonify, request, session
from models.users import User
from flask import Flask
from api.v1.views import api_v1
from flask_cors import CORS
import os
from dotenv import load_dotenv
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Load environment variables from the .env file
load_dotenv()
if __name__ == '__main__':
	app = Flask(__name__)
	CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
	app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
	app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE')
	app.config['SESSION_COOKIE_SAMESITE'] = os.getenv('SESSION_COOKIE_SAMESITE')
	app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE')
	app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
	app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=int(os.getenv('PSLT')))
	app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
	app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
	app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
	app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
	app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
	app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
	os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

	session.init_app(app)
	mail.init_app(app)
