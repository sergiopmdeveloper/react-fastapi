from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    """
    User model
    """

    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str
