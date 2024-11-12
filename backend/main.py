from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def get_root():
    """
    Hello world!
    """

    return {"Hello": "World"}
