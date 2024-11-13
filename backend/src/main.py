from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from auth.router import router as auth_router

app = FastAPI()

app.include_router(auth_router)


@app.get("/")
def root() -> RedirectResponse:
    """
    Redirects to the /docs endpoint

    Returns
    -------
    RedirectResponse
        Redirection to the /docs endpoint
    """

    return RedirectResponse(url="/docs")
