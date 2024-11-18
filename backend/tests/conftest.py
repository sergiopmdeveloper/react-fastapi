from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.engine import Engine
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from src.database import CONNECT_ARGS
from src.dependencies import get_session
from src.main import app


@pytest.fixture(name="engine")
def engine_fixture() -> Generator[Engine, None, None]:
    """
    Engine fixture

    Yields
    ------
    Engine
        The engine fixture
    """

    __import__("src.auth.models")

    engine = create_engine("sqlite://", connect_args=CONNECT_ARGS, poolclass=StaticPool)
    SQLModel.metadata.create_all(engine)

    yield engine


@pytest.fixture(name="session")
def session_fixture(engine: Engine) -> Generator[Session, None, None]:
    """
    Session fixture

    Parameters
    ----------
    engine : Engine
        The engine fixture

    Yields
    ------
    Session
        The session fixture
    """

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
        Gets a session to override the app dependency
        """

        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)

    yield client

    app.dependency_overrides.clear()
