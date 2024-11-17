from fastapi.testclient import TestClient
from sqlmodel import Session

from src.auth.models import User
from src.auth.utils import HashHandler


def test_login_invalid_credentials(client: TestClient):
    """
    Tests the login endpoint with invalid credentials
    and checks if the response status code is 400
    and if the response contains the error message
    """

    response = client.post(
        "/auth/generate-token",
        data={"username": "test@email.com", "password": "password"},
    )

    data = response.json()

    assert response.status_code == 400
    assert data["detail"] == "Incorrect email or password"


def test_login_success(monkeypatch, session: Session, client: TestClient):
    """
    Tests the login endpoint with valid credentials
    and checks if the response status code is 200
    and if the response contains the access token
    and if the token type is bearer
    """

    monkeypatch.setenv("SECRET_KEY", "secret")

    user = User(
        name="name",
        email="test@email.com",
        password=HashHandler.hash("password"),
    )

    session.add(user)
    session.commit()

    response = client.post(
        "/auth/generate-token",
        data={"username": "test@email.com", "password": "password"},
    )

    data = response.json()

    assert response.status_code == 200
    assert "access_token" in data
    assert data["token_type"] == "bearer"
