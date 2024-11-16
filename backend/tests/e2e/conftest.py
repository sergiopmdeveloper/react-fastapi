from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from src.database import CONNECT_ARGS
from src.dependencies import get_session
from src.main import app


@pytest.fixture(name="session")
def session_fixture() -> Generator[Session, None, None]:
    """
    Session fixture

    Yields
    ------
    Session
        The session fixture
    """

    __import__("src.auth.models")

    engine = create_engine("sqlite://", connect_args=CONNECT_ARGS, poolclass=StaticPool)

    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session) -> Generator[TestClient, None, None]:
    """
    Client fixture

    Parameters
    ----------
    session : Session
        The session fixture

    Yields
    ------
    TestClient
        The client fixture
    """

    def get_session_override() -> Session:
        """
        Gets a session to override the dependency
        """

        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)

    yield client

    app.dependency_overrides.clear()
