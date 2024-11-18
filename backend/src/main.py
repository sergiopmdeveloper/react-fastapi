from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from src.auth.router import router as auth_router
from src.database import create_db_and_tables


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    """
    App lifetime context manager that executes the following steps:

    On startup:
    - Creates the database and tables

    Parameters
    ----------
    _ : FastAPI
        The FastAPI instance, not used
    """

    create_db_and_tables()

    yield


def init_app() -> FastAPI:
    """
    Initializes the app

    Returns
    -------
    FastAPI
        The app
    """

    app = FastAPI(lifespan=lifespan)

    app.include_router(auth_router)

    return app


app = init_app()


@app.get("/")
def root() -> RedirectResponse:
    """
    Redirects to the /docs endpoint

    Returns
    -------
    RedirectResponse
        The redirection to the /docs endpoint
    """

    return RedirectResponse(url="/docs")
