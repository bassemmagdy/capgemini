FROM python:3.7-slim
# set python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# set work directory
WORKDIR /code
# copy to new work directory
COPY . /code/
# install requirements
RUN pip install -r requirements.txt
