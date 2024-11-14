from pydantic import BaseModel


class TokenOutput(BaseModel):
    """
    Token output schema
    """

    access_token: str
    token_type: str = "bearer"
