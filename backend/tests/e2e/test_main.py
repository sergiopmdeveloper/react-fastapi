from unittest.mock import patch

from fastapi.testclient import TestClient

from src.auth.router import router as auth_router
from src.main import init_app, lifespan


async def test_lifespan():
    """
    Tests the lifespan context manager of the app
    and checks if the create_db_and_tables function is called
    """

    with patch("src.main.create_db_and_tables") as mock_create_db_and_tables:
        async with lifespan(None):
            pass

    mock_create_db_and_tables.assert_called_once()


def test_init_app():
    """
    Tests the init_app function
    and checks if the app is created with the lifespan context manager
    and if the app.include_router function is called with the auth_router
    """

    with patch("src.main.FastAPI") as mock_app:
        init_app()

    mock_app.assert_called_once_with(lifespan=lifespan)
    mock_app.return_value.include_router.assert_called_once_with(auth_router)


def test_root(client: TestClient):
    """
    Tests the root endpoint of the app
    and checks if it redirects to the /docs endpoint
    """

    response = client.get("/")

    assert response.url.path == "/docs"
    assert response.history[0].status_code == 307
