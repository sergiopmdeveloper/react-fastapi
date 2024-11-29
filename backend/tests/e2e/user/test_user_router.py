from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlmodel import Session

from src.auth.models import User


def test_get_user_success(session: Session, client: TestClient):
    """
    Tests the get method of the user endpoint
    and checks if the response status code is 200
    and if the response data is the expected user data
    and if the password is not returned
    """

    user = User(
        name="name",
        email="test@email.com",
        password="password",
    )

    session.add(user)
    session.commit()

    with patch("src.user.router.validate_session"):
        response = client.get(
            f"/user?user_id={user.id}", headers={"Authorization": "Bearer token"}
        )

    data = response.json()

    assert response.status_code == 200
    assert data["id"] == user.id.__str__()
    assert data["name"] == user.name
    assert data["email"] == user.email
    assert data["password"] is None
