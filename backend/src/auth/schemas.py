from pydantic import BaseModel


class RegisterInput(BaseModel):
    """
    Register input schema
    """

    name: str
    email: str
    password: str


class AuthOutput(BaseModel):
    """
    Auth output schema
    """

    user_id: str
    access_token: str
    token_type: str = "bearer"
