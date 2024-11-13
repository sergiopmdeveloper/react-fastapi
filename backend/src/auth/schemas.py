from pydantic import BaseModel


class UserLoginInput(BaseModel):
    """
    User login input schema
    """

    email: str
    password: str


class UserLoginOutput(BaseModel):
    """
    User login output schema
    """

    email: str
    token: str
