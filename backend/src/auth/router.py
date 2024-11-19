from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.auth.models import User
from src.auth.schemas import LoginOutput
from src.auth.utils import HashHandler, JWTHandler
from src.dependencies import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/generate-token")


@router.post("/generate-token", response_model=LoginOutput)
def login(
    *,
    session: Session = Depends(get_session),
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> LoginOutput:
    """
    Generates a token for the user

    Parameters
    ----------
    session : Session
        The database session
    user_credentials : OAuth2PasswordRequestForm
        The user credentials

    Returns
    -------
    LoginOutput
        The user id and the access token

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

    user_id = user.id.__str__()

    response = LoginOutput(
        user_id=user_id,
        access_token=JWTHandler.generate_token({"sub": user_id}),
    )

    return response
