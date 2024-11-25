from pydantic import BaseModel


class LoginOutput(BaseModel):
    """
    Login output schema
    """

    user_id: str
    access_token: str
    token_type: str = "bearer"
