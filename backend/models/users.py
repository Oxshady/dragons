from models.base_model import BaseModel, base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship, backref
from typing import List
from bcrypt import hashpw, gensalt,checkpw
class User(BaseModel, base):
    """User class"""

    __tablename__ = "users"
    first_name: Mapped["str"] = mapped_column(String(50), nullable=False)
    last_name: Mapped["str"] = mapped_column(String(50), nullable=False)
    phoneNumber: Mapped["str"] = mapped_column(String(50), nullable=False)
    address: Mapped["str"] = mapped_column(String(100), nullable=False)
    email: Mapped["str"] = mapped_column(String(60), nullable=False)
    password: Mapped["str"] = mapped_column(String(60), nullable=False)
    def __init__(self, *args, **kwargs) -> None:
        """Initialize a new User object"""
        super().__init__(*args, **kwargs)
        for key, value in kwargs.items():
            if key == "password":
                value = self.hash_password(value)
            setattr(self, key, value)

    def hash_password(self, password: str) -> str:
        """Hash password"""
        salt = gensalt()
        passwd = hashpw(password.encode('utf-8'), salt)
        return passwd.decode('utf-8')
    
    def check_password(self, password: str) -> bool:
        """Check password"""
        return checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
