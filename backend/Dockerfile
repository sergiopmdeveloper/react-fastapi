FROM python:3.13-bullseye

WORKDIR /app

RUN python -m venv env

RUN /app/env/bin/pip install --upgrade pip

COPY ./requirements.txt /app/requirements.txt

RUN /app/env/bin/pip install -r requirements.txt

COPY . /app

CMD ["/app/env/bin/fastapi", "dev", "src/main.py", "--host", "0.0.0.0", "--port", "80"]
