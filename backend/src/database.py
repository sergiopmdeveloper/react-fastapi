import os

from sqlmodel import SQLModel, create_engine

__import__("src.auth.models")

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///db.sqlite")
CONNECT_ARGS = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=CONNECT_ARGS)


def create_db_and_tables() -> None:
    """
    Creates the database and tables
    """

    SQLModel.metadata.create_all(engine)
