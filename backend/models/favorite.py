from models.base_model import BaseModel, base
from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from typing import List
from bcrypt import hashpw, gensalt,checkpw
from time import time
import jwt
from flask import current_app
from models import db
class Favorite(BaseModel, base):
    """Favorite class"""

    __tablename__ = "favorites"
    movie_id: Mapped[int] = mapped_column(Integer, nullable=False)
    rate: Mapped["int"] = mapped_column(Integer, nullable=False)
    language: Mapped["str"] = mapped_column(String(30), nullable=False)
    popularity: Mapped["float"] = mapped_column(Float, nullable=False)
    user_id: Mapped["str"] = mapped_column(String(60), ForeignKey("users.id"), nullable=False)
    
    def __init__(self, *args, **kwargs) -> None:
        """Initialize a new User object"""
        super().__init__(*args, **kwargs)
