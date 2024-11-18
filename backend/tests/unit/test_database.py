from unittest.mock import patch

from sqlalchemy.engine import Engine

from src.database import create_db_and_tables


def test_create_db_and_tables(engine: Engine):
    """
    Tests the create_db_and_tables function
    and checks if the sqlmodel.metadata.create_all method is called once with the provided engine
    """

    with (
        patch("src.database.engine", engine),
        patch("src.database.SQLModel") as mock_sqlmodel,
    ):
        create_db_and_tables()

    mock_sqlmodel.metadata.create_all.assert_called_once_with(engine)
