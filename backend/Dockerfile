FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

ADD requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY ./app /app/app
