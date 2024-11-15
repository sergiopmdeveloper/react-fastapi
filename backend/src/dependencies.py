from typing import Generator

from sqlmodel import Session

from src.database import engine


def get_session() -> Generator[Session, None, None]:
    """
    Gets a session from the database connection

    Returns
    -------
    Generator[Session, None, None]
        A generator that yields a session
    """

    with Session(engine) as session:
        yield session
