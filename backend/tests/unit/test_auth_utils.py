from datetime import datetime, timedelta
from unittest.mock import patch

from src.auth.utils import HashHandler, JWTHandler


def test_hash_handler_hash():
    """
    Tests the HashHandler.hash method
    and checks if it hashes the data
    """

    with patch("src.auth.utils.hashlib.sha256") as mock_sha256:
        HashHandler.hash("password")

    mock_sha256.return_value.update.assert_called_with(b"password")
    mock_sha256.return_value.hexdigest.assert_called()


def test_jwt_handler_generate_token(monkeypatch):
    """
    Tests the JWTHandler.generate_token method
    and checks if it generates a token
    """

    monkeypatch.setenv("SECRET_KEY", "secret")

    with (
        patch("src.auth.utils.jwt") as mock_jwt,
        patch("src.auth.utils.datetime") as mock_datetime,
    ):
        mock_datetime.now.return_value = datetime(2024, 1, 1)
        JWTHandler.generate_token({"sub": 1})

    mock_jwt.encode.assert_called_with(
        {"sub": 1, "exp": datetime(2024, 1, 1) + timedelta(minutes=60 * 24)},
        "secret",
        algorithm="HS256",
    )
