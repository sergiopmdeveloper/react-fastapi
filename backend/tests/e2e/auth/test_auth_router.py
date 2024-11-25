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
    and if the returned user id is correct
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
    assert data["user_id"] == user.id.__str__()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_register_already_exists(session: Session, client: TestClient):
    """
    Tests the register endpoint with an email that already exists
    and checks if the response status code is 409
    and if the response contains the error message
    """

    user = User(
        name="name",
        email="test@email.com",
        password="password",
    )

    session.add(user)
    session.commit()

    response = client.post(
        "/auth/register",
        json={
            "name": "name",
            "email": "test@email.com",
            "password": "password",
        },
    )

    data = response.json()

    assert response.status_code == 409
    assert data["detail"] == "Email already exists"


def test_register_success(monkeypatch, client: TestClient):
    """
    Tests the register endpoint with valid data
    and checks if the response status code is 201
    and if the response contains the user id
    and if the response contains the access token
    and if the token type is bearer
    """

    monkeypatch.setenv("SECRET_KEY", "secret")

    response = client.post(
        "/auth/register",
        json={
            "name": "name",
            "email": "test@email.com",
            "password": "password",
        },
    )

    data = response.json()

    assert response.status_code == 201
    assert "user_id" in data
    assert "access_token" in data
    assert data["token_type"] == "bearer"
