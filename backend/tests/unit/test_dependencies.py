from unittest.mock import patch

from sqlalchemy.engine import Engine

from src.dependencies import get_session


def test_get_session(engine: Engine):
    """
    Tests the get_session dependency
    and checks if the session is bound to the provided engine
    """

    with patch("src.dependencies.engine", engine):
        session = next(get_session())

    assert session.bind == engine
