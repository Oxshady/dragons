import os
from dotenv import load_dotenv
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
from flask_mail import Mail

session = Session()
mail = Mail()

# Load environment variables from the .env file
load_dotenv()

def create_app():
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
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  #! Allow HTTP requests, not HTTPS

    session.init_app(app)
    mail.init_app(app)

    from .views.login import login as login_blueprint
    from .views.register import register as register_blueprint
    from .views.logout import logout as logout_blueprint
    from .views.reset_password import reset as reset_blueprint

    app.register_blueprint(login_blueprint, url_prefix='/')
    app.register_blueprint(register_blueprint, url_prefix='/')
    app.register_blueprint(logout_blueprint, url_prefix='/')
    app.register_blueprint(reset_blueprint, url_prefix='/')
        
    return app
