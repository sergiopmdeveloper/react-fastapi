from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login() -> dict[str, str]:
    """
    Logs in the user

    Returns
    -------
    dict[str, str]
        Log in response
    """

    return {"description": "Login successful"}
