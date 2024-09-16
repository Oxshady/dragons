from models.db.storage import DBstorage
from flask_session import Session
from flask_mail import Mail

session = Session()
mail = Mail()


db = DBstorage()
db.setup()
