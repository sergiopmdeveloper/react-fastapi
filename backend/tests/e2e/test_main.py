from unittest.mock import call, patch

from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient

from src.auth.router import router as auth_router
from src.main import init_app, lifespan
from src.user.router import router as user_router


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
    and if the app.include_router function is called with the user_router
    and if the app.add_middleware function is called with the expected parameters
    """

    with patch("src.main.FastAPI") as mock_app:
        init_app()

    mock_app.assert_called_once_with(lifespan=lifespan)

    mock_app.return_value.include_router.assert_has_calls(
        [call(auth_router), call(user_router)], any_order=True
    )

    mock_app.return_value.add_middleware.assert_called_once_with(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def test_root(client: TestClient):
    """
    Tests the root endpoint of the app
    and checks if it redirects to the /docs endpoint
    """

    response = client.get("/")

    assert response.url.path == "/docs"
    assert response.history[0].status_code == 307
