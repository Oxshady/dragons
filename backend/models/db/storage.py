from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import base
from models.watch_list import WatchList
from models.watched_before import WatchedBefore
from models.favorite import Favorite
from models.users import User
import os
from dotenv import load_dotenv
load_dotenv()
mapp = {
    "User": User,
    "WatchList": WatchList,
    "WatchedBefore": WatchedBefore,
    "Favorite": Favorite
}

class DBstorage:
    __engine = None
    __session = None

    def __init__(self):
        db = "dragons"
        user = os.getenv("MYSQL_USER")
        passwd = os.getenv("MYSQL_PWD")
        host = "localhost"
        self.__engine = create_engine(
            "mysql+mysqldb://{}:{}@{}/{}".format(user, passwd, host, db),
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
            pool_timeout=30
        )

    def setup(self):
        base.metadata.create_all(self.__engine)
        sfactory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(sfactory)

    def filter_group(self, cls, **kwargs):
        if str(cls) in mapp:
            return self.__session.query(mapp[str(cls)]).filter_by(**kwargs).all()

    def filter_one(self, cls, **kwargs):
        if str(cls) in mapp:
            return self.__session.query(mapp[str(cls)]).filter_by(**kwargs).first()

    def post(self, obj):
        self.__session.add(obj)
        self.__session.commit()

    def save(self):
        self.__session.commit()
    
    def roll(self):
        self.__session.rollback()

    def get_all(self, cls):
        if str(cls) in mapp:
            return self.__session.query(mapp[str(cls)]).all()
        else:
            return []

    def delete(self, obj):
        self.__session.delete(obj)
        self.__session.commit()

    def get(self, cls, id):
        if str(cls) in mapp:
            return self.__session.query(mapp[str(cls)]).get(id)
        else:
            return None

    def close(self):
        self.__session.remove()

    def get_session(self):
        return self.__session
