import uuid

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    """
    User model
    """

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    email: str
    password: str
