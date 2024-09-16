from flask import Blueprint

api_v1 = Blueprint('api_v1', __name__,url_prefix='/api/v1')

from api.v1.views.radio import *
from api.v1.views.login import *
from api.v1.views.register import *
from api.v1.views.logout import *
from api.v1.views.reset_password import *
from api.v1.views.profile import *
