from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.auth.models import User
from src.auth.schemas import TokenOutput
from src.auth.utils import HashHandler, JWTHandler
from src.dependencies import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/generate-token")


@router.post("/generate-token", response_model=TokenOutput)
def login(
    *,
    session: Session = Depends(get_session),
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> TokenOutput:
    """
    Generates a token for the user

    Returns
    -------
    TokenOutput
        The generated token

    Raises
    ------
    HTTPException
        If the user credentials are invalid
    """

    INVALID_CREDENTIALS_ERROR_MSG = "Incorrect email or password"

    statement = select(User).where(User.email == user_credentials.username)
    results = session.exec(statement)
    user = results.first()

    if not user:
        raise HTTPException(status_code=400, detail=INVALID_CREDENTIALS_ERROR_MSG)

    if user.password != HashHandler.hash(user_credentials.password):
        raise HTTPException(status_code=400, detail=INVALID_CREDENTIALS_ERROR_MSG)

    response = TokenOutput(
        access_token=JWTHandler.generate_token({"sub": user.id}),
    )

    return response
