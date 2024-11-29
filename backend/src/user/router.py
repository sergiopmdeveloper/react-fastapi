from uuid import UUID

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from src.auth.models import User
from src.auth.router import oauth2_scheme, validate_session
from src.dependencies import get_session

router = APIRouter(prefix="/user", tags=["user"])


@router.get("", response_model=User)
def get_user(
    *,
    session: Session = Depends(get_session),
    token: str = Depends(oauth2_scheme),
    user_id: UUID
) -> User:
    """
    Gets a user by its id

    Parameters
    ----------
    session : Session
        The database session
    token : str
        The access token
    user_id : UUID
        The user id

    Returns
    -------
    User
        The user
    """

    validate_session(token=token, user_id=str(user_id))

    statement = select(User).where(User.id == user_id)
    results = session.exec(statement)
    user = results.first()
    user.password = None

    return user
