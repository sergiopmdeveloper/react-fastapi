from typing import Annotated, Optional

import jwt
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.auth.models import User
from src.auth.schemas import AuthOutput, RegisterInput
from src.auth.utils import HashHandler, JWTHandler
from src.dependencies import get_session
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/generate-token")


@router.post("/generate-token", response_model=AuthOutput)
def login(
    *,
    session: Session = Depends(get_session),
    user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> AuthOutput:
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
    AuthOutput
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

    response = AuthOutput(
        user_id=user_id,
        access_token=JWTHandler.generate_token({"sub": user_id}),
    )

    return response


@router.post("/register", response_model=AuthOutput)
def register(
    *, session: Session = Depends(get_session), user_data: RegisterInput
) -> AuthOutput:
    """
    Registers a new user and generates a token for them

    Parameters
    ----------
    session : Session
        The database session
    user_data : RegisterInput
        The user data

    Returns
    -------
    AuthOutput
        The user id and the access token

    Raises
    ------
    HTTPException
        If the email already exists
    """

    EMAIL_ALREADY_EXISTS_ERROR_MSG = "Email already exists"

    user_data.password = HashHandler.hash(user_data.password)

    user = User.model_validate(user_data)

    session.add(user)

    try:
        session.commit()
    except IntegrityError:
        raise HTTPException(status_code=409, detail=EMAIL_ALREADY_EXISTS_ERROR_MSG)

    user_id = user.id.__str__()

    response = AuthOutput(
        user_id=user_id,
        access_token=JWTHandler.generate_token({"sub": user_id}),
    )

    return response


@router.post("/validate-token", response_model=bool)
def validate_session(
    *, token: str = Depends(oauth2_scheme), user_id: Optional[str] = None
) -> bool:
    """
    Validates the token

    Parameters
    ----------
    token : str
        The token to validate
    user_id : Optional[str]
        The user id to validate the token against

    Returns
    -------
    bool
        Whether the token is valid

    Raises
    ------
    HTTPException
        If the token is invalid
        or if the user id does not match the token
    """

    INVALID_TOKEN_ERROR_MSG = "Invalid token"

    try:
        data = JWTHandler.validate_token(token)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail=INVALID_TOKEN_ERROR_MSG)
    except Exception:
        raise HTTPException(status_code=520, detail="Unknown error")

    if user_id and data.get("sub") != user_id:
        raise HTTPException(status_code=401, detail=INVALID_TOKEN_ERROR_MSG)

    return True
