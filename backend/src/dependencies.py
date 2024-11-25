from typing import Generator

from sqlmodel import Session

from src.database import engine


def get_session() -> Generator[Session, None, None]:
    """
    Gets a session from the database connection

    Yields
    ------
    Session
        The database session
    """

    with Session(engine) as session:
        yield session
