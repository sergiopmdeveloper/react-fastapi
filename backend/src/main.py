from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from src.auth.router import router as auth_router
from src.database import create_db_and_tables


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    """
    Context manager that creates the database
    and tables when the application starts

    Parameters
    ----------
    _ : FastAPI
        The FastAPI instance, not used
    """

    create_db_and_tables()

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)


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
