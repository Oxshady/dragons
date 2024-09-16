from flask import Blueprint

api_v1 = Blueprint('api_v1', __name__,url_prefix='/api/v1')

from api.v1.views.ai_recommend import *
from api.v1.views.login import *
from api.v1.views.register import *
from api.v1.views.logout import *
from api.v1.views.reset_password import *
from api.v1.views.profile import *
from api.v1.views.smart_recommend import *
from api.v1.views.home_populate import *
from api.v1.views.id_recommend import *
from api.v1.views.watch_list import *
from api.v1.views.favorite import *
from api.v1.views.watched_before import *
from api.v1.views.movie_details import *