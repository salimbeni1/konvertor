FROM python:3.9-slim

RUN pip install --no-cache-dir uvicorn fastapi python-multipart

EXPOSE 8000

COPY . .

CMD [ "uvicorn", "server:app" ,"--host=0.0.0.0" , "--reload" ]