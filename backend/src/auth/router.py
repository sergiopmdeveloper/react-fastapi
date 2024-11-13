from fastapi import APIRouter

from src.auth.schemas import UserLoginInput, UserLoginOutput

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=UserLoginOutput)
def login(user: UserLoginInput) -> UserLoginOutput:
    """
    Logs in the user

    Returns
    -------
    UserLoginOutput
        The user email and token
    """

    response = UserLoginOutput(email=user.email, token="token")

    return response
